import { calcLightZone, calculateMobAttack, randchoose, randint } from "../utils";
import { EntityType } from "./enums/EntityEnum";
import { RenderType } from "./enums/RenderEnum";
import { Boss } from "./implements/Boss";
import { IEntity } from "./interfaces/IEntity";
import { IMob } from "./interfaces/IMob";
import { IPlayer } from "./interfaces/IPlayer";
import { ItemCreator } from "./ItemCreator";
import ls from "./localstorage";

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

export class MapWorker {
    isNewLevel: Boolean = false;
    gameOver: Boolean = false;
    mobMove: number = 0;
    playerMove: number = 0;

    public go(mapData: Array<IEntity>, lastKeyCode: string) {
        mapData = this.playerAttackCleaner(mapData);
        mapData = this.mobAttackCleaner(mapData);

        if (this.playerMove >= 5 && lastKeyCode && lastKeyCode !== 'KeyE') {
            mapData = this.keyHandler(mapData, lastKeyCode);
            this.playerMove = 0;
        } else if (lastKeyCode === 'KeyE') {
            mapData = this.keyHandler(mapData, lastKeyCode);
        }
        else {
            this.playerMove++;
        }

        if (20 === this.mobMove) {
            mapData = this.mobMover(mapData);
            this.mobMove = 0;
        } else {
            this.mobMove++;
        }
    }

    private mobMover(mapData: Array<IEntity>) {
        const mobs = mapData.filter(x => x.type === EntityType.Mob || x.type === EntityType.Boss);
        const player = mapData.find(
            x => x.type === EntityType.Player);
        for (const mob of mobs) {
            const direction = chooseDirection(mob as IMob, player as IPlayer);
            mapData = this.entityMove(mapData, { ...direction }, mob.id);
            mapData = attackPlayer(mapData, mob as IMob, player as IPlayer);
        }

        return mapData;

        function attackPlayer(mapData: Array<IEntity>, mob: IMob, player: IPlayer) {
            const x1 = mob.x - 1;
            const y1 = mob.y - 1;
            const x2 = mob.x + 1;
            const y2 = mob.y + 1;
            if (player.x >= x1 && player.y >= y1 && player.x <= x2 && player.y <=
                y2) {
                player = calculateMobAttack(player, mob);
                player.renderType = RenderType.RedPlayer;
            }

            mapData[mapData.findIndex(x => x.type === EntityType.Player)] = player;
            return mapData;
        }

        function chooseDirection(mob: IMob, player: IPlayer): { x: number, y: number } {
            const x1 = mob.x - 4;
            const y1 = mob.y - 4;
            const x2 = mob.x + 4;
            const y2 = mob.y + 4;
            if (player.x >= x1 && player.y >= y1
                && player.x <= x2 && player.y <= y2) {
                const diffX = Math.abs(player.x - mob.x);
                const diffY = Math.abs(player.y - mob.y);

                let x: number = 0, y: number = 0;

                let futurePlaces = [];
                futurePlaces.push({
                    direction: DIRECTIONS.UP, place: mapData.find(
                        x => x.x === mob.x + DIRECTIONS.UP.x && x.y === mob.y +
                            DIRECTIONS.UP.y),
                });
                futurePlaces.push({
                    direction: DIRECTIONS.LEFT, place: mapData.find(
                        x => x.x === mob.x + DIRECTIONS.LEFT.x && x.y === mob.y +
                            DIRECTIONS.LEFT.y),
                });
                futurePlaces.push({
                    direction: DIRECTIONS.RIGHT,
                    place: mapData.find(
                        x => x.x === mob.x + DIRECTIONS.RIGHT.x && x.y === mob.y +
                            DIRECTIONS.RIGHT.y),
                });
                futurePlaces.push({
                    direction: DIRECTIONS.DOWN,
                    place: mapData.find(
                        x => x.x === mob.x + DIRECTIONS.DOWN.x && x.y === mob.y +
                            DIRECTIONS.DOWN.y),
                });
                futurePlaces = futurePlaces.filter(x => x.place!.type === EntityType.Void);

                for (const futurePlace of futurePlaces) {
                    const newDiffX = Math.abs(
                        player.x - (mob.x + futurePlace.direction.x));
                    const newDiffY = Math.abs(
                        player.y - (mob.y + futurePlace.direction.y));

                    if (newDiffX < diffX || newDiffY < diffY) {
                        x = futurePlace.direction.x;
                        y = futurePlace.direction.y;
                        break;
                    }
                }
                return { x, y };
            } else {
                let x = randint(-1, 1);
                let y: number;
                if (x === -1 || x === 1) {
                    y = 0;
                } else if (x === 0) {
                    y = randchoose<number>([-1, 1]);
                } else {
                    y = randint(-1, 1);
                }
                const futurePlace = mapData.find(
                    data => data.x === mob.x + x && data.y === mob.y + y)!;
                if (futurePlace.type === EntityType.Void) {
                    return { x, y };
                } else {
                    return { x: 0, y: 0 };
                }
            }
        }
    }

    private chooseRenderType(entity: IEntity, direction: { x: number, y: number }): RenderType {
        let renderType: RenderType;
        if (entity.type === EntityType.Player) {
            switch (direction) {
                case DIRECTIONS.DOWN: {
                    renderType = entity.renderType === RenderType.PlayerDown1 ? RenderType.PlayerDown2 :
                        entity.renderType === RenderType.PlayerDown2 ? RenderType.PlayerDown3 :
                            entity.renderType === RenderType.PlayerDown3 ? RenderType.PlayerDown1 : RenderType.PlayerDown1;
                    break;
                }
                case DIRECTIONS.UP: {
                    renderType = entity.renderType === RenderType.PlayerUp1 ? RenderType.PlayerUp2 :
                        entity.renderType === RenderType.PlayerUp2 ? RenderType.PlayerUp3 :
                            entity.renderType === RenderType.PlayerUp3 ? RenderType.PlayerUp1 : RenderType.PlayerUp1;
                    break;
                }
                case DIRECTIONS.LEFT: {
                    renderType = entity.renderType === RenderType.PlayerLeft1 ? RenderType.PlayerLeft2 :
                        entity.renderType === RenderType.PlayerLeft2 ? RenderType.PlayerLeft3 :
                            entity.renderType === RenderType.PlayerLeft3 ? RenderType.PlayerLeft1 : RenderType.PlayerLeft1;
                    break;
                }
                case DIRECTIONS.RIGHT: {
                    renderType = entity.renderType === RenderType.PlayerRight1 ? RenderType.PlayerRight2 :
                        entity.renderType === RenderType.PlayerRight2 ? RenderType.PlayerRight3 :
                            entity.renderType === RenderType.PlayerRight3 ? RenderType.PlayerRight1 : RenderType.PlayerRight1;
                    break;
                }
                default:
                    renderType = RenderType.PlayerDown1;
                    break;
            }
        } else if (entity.type === EntityType.Mob) {
            if (direction.x === 0 && direction.y === 1) {
                renderType = entity.renderType === RenderType.MobDown1 ? RenderType.MobDown2 :
                    entity.renderType === RenderType.MobDown2 ? RenderType.MobDown3 :
                        entity.renderType === RenderType.MobDown3 ? RenderType.MobDown1 : RenderType.MobDown1;
            } else if (direction.x === 0 && direction.y === -1) {
                renderType = entity.renderType === RenderType.MobUp1 ? RenderType.MobUp2 :
                    entity.renderType === RenderType.MobUp2 ? RenderType.MobUp3 :
                        entity.renderType === RenderType.MobUp3 ? RenderType.MobUp1 : RenderType.MobUp1;
            } else if (direction.x === -1 && direction.y === 0) {
                renderType = entity.renderType === RenderType.MobLeft1 ? RenderType.MobLeft2 :
                    entity.renderType === RenderType.MobLeft2 ? RenderType.MobLeft3 :
                        entity.renderType === RenderType.MobLeft3 ? RenderType.MobLeft1 : RenderType.MobLeft1;
            } else if (direction.x === 1 && direction.y === 0) {
                renderType = entity.renderType === RenderType.MobRight1 ? RenderType.MobRight2 :
                    entity.renderType === RenderType.MobRight2 ? RenderType.MobRight3 :
                        entity.renderType === RenderType.MobRight3 ? RenderType.MobRight1 : RenderType.MobRight1;
            } else {
                renderType = RenderType.MobDown1;
            }
        } else if (entity.type === EntityType.Boss) {
            if (direction.x === 0 && direction.y === 1) {
                renderType = entity.renderType === RenderType.BossDown1 ? RenderType.BossDown2 :
                    entity.renderType === RenderType.BossDown2 ? RenderType.BossDown3 :
                        entity.renderType === RenderType.BossDown3 ? RenderType.BossDown1 : RenderType.BossDown1;
            } else if (direction.x === 0 && direction.y === -1) {
                renderType = entity.renderType === RenderType.BossUp1 ? RenderType.BossUp2 :
                    entity.renderType === RenderType.BossUp2 ? RenderType.BossUp3 :
                        entity.renderType === RenderType.BossUp3 ? RenderType.BossUp1 : RenderType.BossUp1;
            } else if (direction.x === -1 && direction.y === 0) {
                renderType = entity.renderType === RenderType.BossLeft1 ? RenderType.BossLeft2 :
                    entity.renderType === RenderType.BossLeft2 ? RenderType.BossLeft3 :
                        entity.renderType === RenderType.BossLeft3 ? RenderType.BossLeft1 : RenderType.BossLeft1;
            } else if (direction.x === 1 && direction.y === 0) {
                renderType = entity.renderType === RenderType.BossRight1 ? RenderType.BossRight2 :
                    entity.renderType === RenderType.BossRight2 ? RenderType.BossRight3 :
                        entity.renderType === RenderType.BossRight3 ? RenderType.BossRight1 : RenderType.BossRight1;
            } else {
                renderType = RenderType.BossDown1;
            }
        } else {
            renderType = entity.renderType;
        }

        return renderType;
    }

    private entityMove(mapData: Array<IEntity>, direction: { x: number, y: number }, entityId: string) {
        const entityIndex = mapData.findIndex(x => x.id === entityId);
        const entity: IEntity = { ...mapData[entityIndex] };
        const futureX = entity.x + direction.x;
        const futureY = entity.y + direction.y;
        const futurePlaceIndex = mapData.findIndex(
            data => data.x === futureX && data.y === futureY);
        const futurePlace = { ...mapData[futurePlaceIndex] };

        let renderType: RenderType = this.chooseRenderType(entity, direction);


        if (futurePlaceIndex !== -1) {
            if (futurePlace.type === EntityType.Void || futurePlace.type === EntityType.Ladder) {
                mapData[futurePlaceIndex] = {
                    ...entity,
                    x: futurePlace.x,
                    y: futurePlace.y,
                    light: futurePlace.light,
                    renderType: renderType || entity.renderType
                };
                mapData[entityIndex] = {
                    ...futurePlace,
                    x: entity.x,
                    y: entity.y,
                    light: entity.light,
                    type: EntityType.Void,
                };
                if (entity.type === EntityType.Player) {
                    mapData = calcLightZone(mapData);
                    if (futurePlace.type === EntityType.Ladder) {
                        this.isNewLevel = true;
                    }
                }
            }
        }

        return mapData;
    }

    private keyHandler(mapData: Array<IEntity>, lastKeyCode: string): Array<IEntity> {
        const player = mapData.find(x => x.type === EntityType.Player)!;
        console.log(lastKeyCode);
        switch (lastKeyCode) {
            case 'KeyW': {
                return this.entityMove(mapData, DIRECTIONS.UP, player.id);
            }
            case 'KeyS': {
                return this.entityMove(mapData, DIRECTIONS.DOWN, player.id);
            }
            case 'KeyA': {
                return this.entityMove(mapData, DIRECTIONS.LEFT, player.id);
            }
            case 'KeyD': {
                return this.entityMove(mapData, DIRECTIONS.RIGHT, player.id);
            }
            case 'KeyE': {
                return this.playerAttack(mapData, player as IPlayer);
            }
            default: {
                return mapData;
            }
        }
    }

    private playerAttack(mapData: Array<IEntity>, player: IPlayer) {
        const leftItem = mapData.find(
            data => data.x === player.x - 1 && data.y === player.y)!;
        const upItem = mapData.find(
            data => data.x === player.x && data.y === player.y - 1)!;
        const rightItem = mapData.find(
            data => data.x === player.x + 1 && data.y === player.y)!;
        const downItem = mapData.find(
            data => data.x === player.x && data.y === player.y + 1)!;

        let attackedMob: IMob | null = null;
        let openedChest: IEntity | null = null;

        if (leftItem && (leftItem.type === EntityType.Mob || leftItem.type === EntityType.Boss)) {
            attackedMob = leftItem as IMob;
        } else if (upItem && (upItem.type === EntityType.Mob || upItem.type === EntityType.Boss)) {
            attackedMob = upItem as IMob;
        } else if (rightItem && (rightItem.type === EntityType.Mob || rightItem.type === EntityType.Boss)) {
            attackedMob = rightItem as IMob;
        } else if (downItem && (downItem.type === EntityType.Mob || downItem.type === EntityType.Boss)) {
            attackedMob = downItem as IMob;
        } else {
            if (leftItem && leftItem.type === EntityType.Chest) {
                openedChest = leftItem;
            } else if (upItem && upItem.type === EntityType.Chest) {
                openedChest = upItem;
            } else if (rightItem && rightItem.type === EntityType.Chest) {
                openedChest = rightItem;
            } else if (downItem && downItem.type === EntityType.Chest) {
                openedChest = downItem;
            }
        }

        if (attackedMob) {
            attackedMob.data.hp -= player.data.power;
            console.log(attackedMob instanceof Boss);
            mapData[mapData.findIndex(x => x.id === attackedMob!.id)].renderType = attackedMob.type === EntityType.Boss ? RenderType.RedBoss : RenderType.RedMob;
        } else if (openedChest) {
            mapData[mapData.findIndex(x => x.id === openedChest!.id)].type = EntityType.Void;
            mapData[mapData.findIndex(x => x.id === openedChest!.id)].renderType = RenderType.Void;
            if (player.data.inventory.length < 6) {
                const itemCreator = new ItemCreator();
                player.data.inventory.push(itemCreator.create());
                console.log(player);
            }
        }

        return mapData;
    }

    private mobAttackCleaner(mapData: Array<IEntity>) {
        const player = mapData.find(x => x.type === EntityType.Player) as IPlayer;
        if (player) {
            if (player.data.hp <= 0) {
                this.gameOver = true;
            }
        }

        return mapData;
    }

    private playerAttackCleaner(mapData: Array<IEntity>) {
        const redMobs = mapData.filter(x => x.renderType === RenderType.RedMob) as Array<IMob>;
        for (const redMob of redMobs) {
            if (redMob.data.hp <= 0) {
                mapData[mapData.findIndex(x => x.id === redMob.id)].type = EntityType.Void;
                mapData[mapData.findIndex(x => x.id === redMob.id)].renderType = RenderType.Void;
                ls.killedMobs++;
            } else {
                mapData[mapData.findIndex(x => x.id === redMob.id)].renderType = RenderType.MobDown1;
            }
        }
        const redBosses = mapData.filter(x => x.renderType === RenderType.RedBoss) as Array<IMob>;
        for (const redBoss of redBosses) {
            if (redBoss.data.hp <= 0) {
                mapData[mapData.findIndex(x => x.id === redBoss.id)].type = EntityType.Void;
                mapData[mapData.findIndex(x => x.id === redBoss.id)].renderType = RenderType.Void;
                ls.killedMobs++;
            } else {
                mapData[mapData.findIndex(x => x.id === redBoss.id)].renderType = RenderType.BossDown1;
            }
        }
        return mapData;
    }
}