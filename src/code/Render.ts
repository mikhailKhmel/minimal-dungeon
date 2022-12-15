import { loadImage } from "../utils";
import { EntityType } from "./common/EntityEnum";
import { ItemType } from "./common/ItemEnum";
import { RenderType } from "./common/RenderEnum";
import { HEIGHT, IMG_SIZE, WIDTH } from "./Constants";
import { IEntity } from "./interfaces/IEntity";
import { IItem } from "./interfaces/IItem";

export class Render {
    assets: Array<{ path: string, src: HTMLImageElement, type: RenderType }> = [];

    public async loadAssets() {
        this.assets = [
            {
                path: '../assets/inv/potion.png',
                src: await loadImage('../assets/inv/potion.png'),
                type: RenderType.Potion
            },
            {
                path: '../assets/inv/disk_lvl1.png',
                src: await loadImage('../assets/inv/disk_lvl1.png'),
                type: RenderType.Weapon
            },
            {
                path: '../assets/inv/armor_lvl1.png',
                src: await loadImage('../assets/inv/armor_lvl1.png'),
                type: RenderType.Armory
            },
            { path: '', src: await loadImage('../assets/entities/chest.bmp'), type: RenderType.Chest },
            { path: '', src: await loadImage('../assets/entities/ladder.bmp'), type: RenderType.Ladder },
            { path: '', src: await loadImage('../assets/player/redPlayer.bmp'), type: RenderType.RedPlayer },
            { path: '', src: await loadImage('../assets/entities/mobs/redMob.bmp'), type: RenderType.RedMob },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_up1.bmp'), type: RenderType.MobUp1 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_up2.bmp'), type: RenderType.MobUp2 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_up3.bmp'), type: RenderType.MobUp3 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_right1.bmp'), type: RenderType.MobRight1 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_right2.bmp'), type: RenderType.MobRight2 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_right3.bmp'), type: RenderType.MobRight3 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_left1.bmp'), type: RenderType.MobLeft1 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_left2.bmp'), type: RenderType.MobLeft2 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_left3.bmp'), type: RenderType.MobLeft3 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_down1.bmp'), type: RenderType.MobDown1 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_down2.bmp'), type: RenderType.MobDown2 },
            { path: '', src: await loadImage('../assets/entities/mobs/mob_down3.bmp'), type: RenderType.MobDown3 },

            { path: '', src: await loadImage('../assets/player/player_down1.bmp'), type: RenderType.PlayerDown1 },
            { path: '', src: await loadImage('../assets/player/player_down2.bmp'), type: RenderType.PlayerDown2 },
            { path: '', src: await loadImage('../assets/player/player_down3.bmp'), type: RenderType.PlayerDown3 },
            { path: '', src: await loadImage('../assets/player/player_up1.bmp'), type: RenderType.PlayerUp1 },
            { path: '', src: await loadImage('../assets/player/player_up2.bmp'), type: RenderType.PlayerUp2 },
            { path: '', src: await loadImage('../assets/player/player_up3.bmp'), type: RenderType.PlayerUp3 },
            { path: '', src: await loadImage('../assets/player/player_right1.bmp'), type: RenderType.PlayerRight1 },
            { path: '', src: await loadImage('../assets/player/player_right2.bmp'), type: RenderType.PlayerRight2 },
            { path: '', src: await loadImage('../assets/player/player_right3.bmp'), type: RenderType.PlayerRight3 },
            { path: '', src: await loadImage('../assets/player/player_left1.bmp'), type: RenderType.PlayerLeft1 },
            { path: '', src: await loadImage('../assets/player/player_left2.bmp'), type: RenderType.PlayerLeft2 },
            { path: '', src: await loadImage('../assets/player/player_left3.bmp'), type: RenderType.PlayerLeft3 },
            { path: '', src: await loadImage('../assets/entities/new_wall.bmp'), type: RenderType.Wall },
            { path: '', src: await loadImage('../assets/entities/new_wall1.bmp'), type: RenderType.Wall1 },
            { path: '', src: await loadImage('../assets/entities/new_wall2.bmp'), type: RenderType.Wall2 },
            { path: '', src: await loadImage('../assets/entities/new_plitka.bmp'), type: RenderType.Void },
            { path: '', src: await loadImage('../assets/entities/new_plitka1.bmp'), type: RenderType.Void1 },
            { path: '', src: await loadImage('../assets/entities/new_plitka2.bmp'), type: RenderType.Void2 },
        ];
    }

    public renderMap(context: CanvasRenderingContext2D, mapData: Array<IEntity>): void {
        const starttime = Date.now();
        const player = mapData.find(x => x.type === EntityType.Player)!;
        const x1 = player.x - Math.floor((HEIGHT / IMG_SIZE) / 2);
        const y1 = player.y - Math.floor((HEIGHT / IMG_SIZE) / 2);
        const x2 = player.x + Math.floor((HEIGHT / IMG_SIZE) / 2);
        const y2 = player.y + Math.floor((HEIGHT / IMG_SIZE) / 2);
        const lightZoneData = mapData.filter(x => x.light && (x.x >= x1 && x.x <= x2 && x.y >= y1 && x.y <= y2));
        context.fillStyle = '#272b30';
        context.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < HEIGHT / IMG_SIZE; i++) {
            for (let j = 0; j < WIDTH / IMG_SIZE; j++) {
                const mapItem = lightZoneData.find(
                    data => data.x === x1 + i && data.y === y1 + j);
                if (mapItem) {
                    if (mapItem.light) {
                        if (!(mapItem.type === EntityType.Void || mapItem.type === EntityType.Wall)) {
                            let img = this.assets.find(x => x.type === RenderType.Void2)!.src;
                            context.drawImage(img, i * IMG_SIZE, j * IMG_SIZE,
                                IMG_SIZE,
                                IMG_SIZE);
                        }
                        let img = this.assets.find(x => x.type === mapItem.renderType)!.src;
                        context.drawImage(img, i * IMG_SIZE, j * IMG_SIZE,
                            IMG_SIZE,
                            IMG_SIZE);
                    }
                }
            }
        }
        console.log(Date.now() - starttime);
    }

    public renderInfo(playerData: { hp: number, armory: number, power: number, inventory: Array<IItem> }, level: number, chests: number, mobs: number) {
        document.getElementById('level')!.innerHTML = level.toString();
        document.getElementById('chests')!.innerHTML = chests.toString();
        document.getElementById('mobs')!.innerHTML = mobs.toString();
        document.getElementById('hp')!.innerHTML = playerData.hp.toString();
        document.getElementById('armory')!.innerHTML = playerData.armory.toString();
        document.getElementById('power')!.innerHTML = playerData.power.toString();

        for (let index = 0; index < 6; index++) {
            let path: string = '';
            const inv = (document.getElementById(`inv-${index + 1}`) as HTMLImageElement);
            const item = playerData.inventory[index];
            if (item) {
                switch (item.type) {
                    case ItemType.Armory: {
                        path = this.assets.find(x => x.type === RenderType.Armory)!.path;
                        break;
                    }
                    case ItemType.Potion: {
                        path = this.assets.find(x => x.type === RenderType.Potion)!.path;

                        break;
                    }
                    case ItemType.Weapon: {
                        path = this.assets.find(x => x.type === RenderType.Weapon)!.path;
                        break;
                    }
                }
            }
            inv.src = path;
        }
    }
}