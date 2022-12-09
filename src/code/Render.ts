import { loadImage } from "../utils";
import { EntityType } from "./common/EntityEnum";
import { RenderType } from "./common/RenderEnum";
import { HEIGHT, IMG_SIZE, WIDTH } from "./Constants";
import { IEntity } from "./interfaces/IEntity";

export class Render {
    assets: Array<{ src: HTMLImageElement, type: RenderType }> = [];
    constructor() {
        //this.loadImages();
    }

    public async loadImages() {
        this.assets = [
            { src: await loadImage('../assets/entities/chest.bmp'), type: RenderType.Chest },
            { src: await loadImage('../assets/entities/ladder.bmp'), type: RenderType.Ladder },
            { src: await loadImage('../assets/player/redPlayer.bmp'), type: RenderType.RedPlayer },
            { src: await loadImage('../assets/entities/mobs/redMob.bmp'), type: RenderType.RedMob },
            { src: await loadImage('../assets/entities/mobs/mob_up1.bmp'), type: RenderType.MobUp1 },
            { src: await loadImage('../assets/entities/mobs/mob_up2.bmp'), type: RenderType.MobUp2 },
            { src: await loadImage('../assets/entities/mobs/mob_up3.bmp'), type: RenderType.MobUp3 },
            { src: await loadImage('../assets/entities/mobs/mob_right1.bmp'), type: RenderType.MobRight1 },
            { src: await loadImage('../assets/entities/mobs/mob_right2.bmp'), type: RenderType.MobRight2 },
            { src: await loadImage('../assets/entities/mobs/mob_right3.bmp'), type: RenderType.MobRight3 },
            { src: await loadImage('../assets/entities/mobs/mob_left1.bmp'), type: RenderType.MobLeft1 },
            { src: await loadImage('../assets/entities/mobs/mob_left2.bmp'), type: RenderType.MobLeft2 },
            { src: await loadImage('../assets/entities/mobs/mob_left3.bmp'), type: RenderType.MobLeft3 },
            { src: await loadImage('../assets/entities/mobs/mob_down1.bmp'), type: RenderType.MobDown1 },
            { src: await loadImage('../assets/entities/mobs/mob_down2.bmp'), type: RenderType.MobDown2 },
            { src: await loadImage('../assets/entities/mobs/mob_down3.bmp'), type: RenderType.MobDown3 },

            { src: await loadImage('../assets/player/player_down1.bmp'), type: RenderType.PlayerDown1 },
            { src: await loadImage('../assets/player/player_down2.bmp'), type: RenderType.PlayerDown2 },
            { src: await loadImage('../assets/player/player_down3.bmp'), type: RenderType.PlayerDown3 },
            { src: await loadImage('../assets/player/player_up1.bmp'), type: RenderType.PlayerUp1 },
            { src: await loadImage('../assets/player/player_up2.bmp'), type: RenderType.PlayerUp2 },
            { src: await loadImage('../assets/player/player_up3.bmp'), type: RenderType.PlayerUp3 },
            { src: await loadImage('../assets/player/player_right1.bmp'), type: RenderType.PlayerRight1 },
            { src: await loadImage('../assets/player/player_right2.bmp'), type: RenderType.PlayerRight2 },
            { src: await loadImage('../assets/player/player_right3.bmp'), type: RenderType.PlayerRight3 },
            { src: await loadImage('../assets/player/player_left1.bmp'), type: RenderType.PlayerLeft1 },
            { src: await loadImage('../assets/player/player_left2.bmp'), type: RenderType.PlayerLeft2 },
            { src: await loadImage('../assets/player/player_left3.bmp'), type: RenderType.PlayerLeft3 },
            { src: await loadImage('../assets/entities/new_wall.bmp'), type: RenderType.Wall },
            { src: await loadImage('../assets/entities/new_wall1.bmp'), type: RenderType.Wall1 },
            { src: await loadImage('../assets/entities/new_wall2.bmp'), type: RenderType.Wall2 },
            { src: await loadImage('../assets/entities/new_plitka.bmp'), type: RenderType.Void },
            { src: await loadImage('../assets/entities/new_plitka1.bmp'), type: RenderType.Void1 },
            { src: await loadImage('../assets/entities/new_plitka2.bmp'), type: RenderType.Void2 },
        ];
    }

    public renderMap(context: CanvasRenderingContext2D, mapData: Array<IEntity>): void {
        const player = mapData.find(
            x => x.type === EntityType.Player)!;
        const x1 = player.x - Math.floor((HEIGHT / IMG_SIZE) / 2);
        const y1 = player.y - Math.floor((HEIGHT / IMG_SIZE) / 2);
        const voidsAndWalls = mapData.map(x => {
            if (!(x.type === EntityType.Void || x.type === EntityType.Wall)) {
                return { ...x, renderType: RenderType.Void2 };
            } else {
                return x;
            }
        });
        const others = mapData.filter(x => !(x.type === EntityType.Void || x.type === EntityType.Wall));
        for (let i = 0; i < HEIGHT / IMG_SIZE; i++) {
            for (let j = 0; j < WIDTH / IMG_SIZE; j++) {
                const mapItem = voidsAndWalls.find(
                    data => data.x === x1 + i && data.y === y1 + j);
                if (mapItem) {
                    if (mapItem.light) {
                        let img = this.assets.find(x => x.type === mapItem.renderType)!.src;
                        context.drawImage(img, i * IMG_SIZE, j * IMG_SIZE,
                            IMG_SIZE,
                            IMG_SIZE);
                    } else {
                        context.clearRect(i * IMG_SIZE, j * IMG_SIZE,
                            IMG_SIZE,
                            IMG_SIZE);
                    }
                }
            }
        }

        for (let i = 0; i < HEIGHT / IMG_SIZE; i++) {
            for (let j = 0; j < WIDTH / IMG_SIZE; j++) {
                const mapItem = others.find(
                    data => data.x === x1 + i && data.y === y1 + j);
                if (mapItem) {
                    if (mapItem.light) {
                        let img = this.assets.find(x => x.type === mapItem.renderType)!.src;
                        context.drawImage(img, i * IMG_SIZE, j * IMG_SIZE,
                            IMG_SIZE,
                            IMG_SIZE);
                    } else {
                        context.clearRect(i * IMG_SIZE, j * IMG_SIZE,
                            IMG_SIZE,
                            IMG_SIZE);
                    }
                }
            }
        }
    }

    public renderInfo(playerData: { hp: number, armor: number, power: number }) {
        document.getElementById('hp')!.innerHTML = playerData.hp.toString();
        document.getElementById('armory')!.innerHTML = playerData.armor.toString();
        document.getElementById('power')!.innerHTML = playerData.power.toString();
    }
}