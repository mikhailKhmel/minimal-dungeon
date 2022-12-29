import { loadImage } from '../utils';
import { EntityType } from './enums/EntityType';
import { ItemType } from './enums/ItemType';
import { RenderType } from './enums/RenderType';
import { HEIGHT, IMG_SIZE, WIDTH } from './Constants';
import { IEntity } from './interfaces/IEntity';
import ls from './LocalStorage';
import { IArmor } from './interfaces/IArmor';
import { IWeapon } from './interfaces/IWeapon';
import { IPlayer } from './interfaces/IPlayer';
import { EquipmentType } from './enums/EquipmentType';

export class Render {
  assets: Array<{ path: string; src: HTMLImageElement; type: RenderType }> = [];
  level: HTMLElement | null = null;
  chests: HTMLElement | null = null;
  mobs: HTMLElement | null = null;
  hp: HTMLElement | null = null;
  armor: HTMLElement | null = null;
  power: HTMLElement | null = null;

  public loadInfo() {
    this.level = document.getElementById('level');
    this.chests = document.getElementById('chests');
    this.mobs = document.getElementById('mobs');
    this.hp = document.getElementById('hp');
    this.armor = document.getElementById('armor');
    this.power = document.getElementById('power');
  }

  public async loadAssets() {
    this.assets = [
      {
        path: '../assets/inv/head.png',
        src: await loadImage('../assets/inv/head.png'),
        type: RenderType.Head,
      },
      {
        path: '../assets/inv/body.png',
        src: await loadImage('../assets/inv/body.png'),
        type: RenderType.Body,
      },
      {
        path: '../assets/inv/legs.png',
        src: await loadImage('../assets/inv/legs.png'),
        type: RenderType.Legs,
      },
      {
        path: '../assets/inv/lefthand.png',
        src: await loadImage('../assets/inv/lefthand.png'),
        type: RenderType.LeftHand,
      },
      {
        path: '../assets/inv/righthand.png',
        src: await loadImage('../assets/inv/righthand.png'),
        type: RenderType.RightHand,
      },
      {
        path: '../assets/inv/scroll.png',
        src: await loadImage('../assets/inv/scroll.png'),
        type: RenderType.Scroll,
      },
      {
        path: '../assets/inv/potion.png',
        src: await loadImage('../assets/inv/potion.png'),
        type: RenderType.Potion,
      },
      { path: '', src: await loadImage('../assets/entities/chest.png'), type: RenderType.Chest },
      { path: '', src: await loadImage('../assets/entities/ladder.png'), type: RenderType.Ladder },
      { path: '', src: await loadImage('../assets/player/redPlayer.png'), type: RenderType.RedPlayer },
      { path: '', src: await loadImage('../assets/entities/mobs/redMob.png'), type: RenderType.RedMob },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_red.png'), type: RenderType.RedBoss },

      { path: '', src: await loadImage('../assets/entities/bosses/boss_up1.png'), type: RenderType.BossUp1 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_up2.png'), type: RenderType.BossUp2 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_up3.png'), type: RenderType.BossUp3 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_right1.png'), type: RenderType.BossRight1 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_right2.png'), type: RenderType.BossRight2 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_right3.png'), type: RenderType.BossRight3 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_left1.png'), type: RenderType.BossLeft1 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_left2.png'), type: RenderType.BossLeft2 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_left3.png'), type: RenderType.BossLeft3 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_down1.png'), type: RenderType.BossDown1 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_down2.png'), type: RenderType.BossDown2 },
      { path: '', src: await loadImage('../assets/entities/bosses/boss_down3.png'), type: RenderType.BossDown3 },

      { path: '', src: await loadImage('../assets/entities/mobs/mob_up1.png'), type: RenderType.MobUp1 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_up2.png'), type: RenderType.MobUp2 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_up3.png'), type: RenderType.MobUp3 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_right1.png'), type: RenderType.MobRight1 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_right2.png'), type: RenderType.MobRight2 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_right3.png'), type: RenderType.MobRight3 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_left1.png'), type: RenderType.MobLeft1 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_left2.png'), type: RenderType.MobLeft2 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_left3.png'), type: RenderType.MobLeft3 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_down1.png'), type: RenderType.MobDown1 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_down2.png'), type: RenderType.MobDown2 },
      { path: '', src: await loadImage('../assets/entities/mobs/mob_down3.png'), type: RenderType.MobDown3 },

      { path: '', src: await loadImage('../assets/player/player_down1.png'), type: RenderType.PlayerDown1 },
      { path: '', src: await loadImage('../assets/player/player_down2.png'), type: RenderType.PlayerDown2 },
      { path: '', src: await loadImage('../assets/player/player_down3.png'), type: RenderType.PlayerDown3 },
      { path: '', src: await loadImage('../assets/player/player_up1.png'), type: RenderType.PlayerUp1 },
      { path: '', src: await loadImage('../assets/player/player_up2.png'), type: RenderType.PlayerUp2 },
      { path: '', src: await loadImage('../assets/player/player_up3.png'), type: RenderType.PlayerUp3 },
      { path: '', src: await loadImage('../assets/player/player_right1.png'), type: RenderType.PlayerRight1 },
      { path: '', src: await loadImage('../assets/player/player_right2.png'), type: RenderType.PlayerRight2 },
      { path: '', src: await loadImage('../assets/player/player_right3.png'), type: RenderType.PlayerRight3 },
      { path: '', src: await loadImage('../assets/player/player_left1.png'), type: RenderType.PlayerLeft1 },
      { path: '', src: await loadImage('../assets/player/player_left2.png'), type: RenderType.PlayerLeft2 },
      { path: '', src: await loadImage('../assets/player/player_left3.png'), type: RenderType.PlayerLeft3 },
      { path: '', src: await loadImage('../assets/entities/new_wall.png'), type: RenderType.Wall },
      { path: '', src: await loadImage('../assets/entities/new_wall1.png'), type: RenderType.Wall1 },
      { path: '', src: await loadImage('../assets/entities/new_wall2.png'), type: RenderType.Wall2 },
      { path: '', src: await loadImage('../assets/entities/new_plitka.png'), type: RenderType.Void },
      { path: '', src: await loadImage('../assets/entities/new_plitka1.png'), type: RenderType.Void1 },
      { path: '', src: await loadImage('../assets/entities/new_plitka2.png'), type: RenderType.Void2 },
    ];
  }

  public renderMap(context: CanvasRenderingContext2D, mapData: Array<IEntity>): void {
    //const starttime = Date.now();
    context.clearRect(0, 0, WIDTH, HEIGHT);

    const imgSize = ls.allVisible ? IMG_SIZE / 2 : IMG_SIZE;
    const player = mapData.find((x) => x.type === EntityType.Player) ?? null;
    if (!player) return;

    const x1 = player.x - Math.floor(HEIGHT / imgSize / 2);
    const y1 = player.y - Math.floor(HEIGHT / imgSize / 2);
    const x2 = player.x + Math.floor(HEIGHT / imgSize / 2);
    const y2 = player.y + Math.floor(HEIGHT / imgSize / 2);
    const lightZoneData = mapData.filter(
      (x) => (ls.allVisible || x.light) && x.x >= x1 && x.x <= x2 && x.y >= y1 && x.y <= y2,
    );

    for (let i = 0; i < HEIGHT / imgSize; i++) {
      for (let j = 0; j < WIDTH / imgSize; j++) {
        const mapItem = lightZoneData.find((data) => data.x === x1 + i && data.y === y1 + j);
        if (mapItem) {
          if (!(mapItem.type === EntityType.Void || mapItem.type === EntityType.Wall)) {
            const img = this.assets.find((x) => x.type === RenderType.Void2)?.src;
            if (!img) return;
            context.drawImage(img, i * imgSize, j * imgSize, imgSize, imgSize);
          }
          const img = this.assets.find((x) => x.type === mapItem.renderType)?.src;
          if (!img) return;
          context.drawImage(img, i * imgSize, j * imgSize, imgSize, imgSize);
        }
      }
    }
    //console.log('rendering ', Date.now() - starttime);
  }

  public renderInfo(playerData: IPlayer, level: number, chests: number, mobs: number) {
    if (!this.level || !this.chests || !this.mobs || !this.hp || !this.armor || !this.power) return;

    this.level.innerText = level.toString();
    this.chests.innerText = chests.toString();
    this.mobs.innerText = mobs.toString();
    this.hp.innerText = playerData.data.hp.toString();
    this.armor.innerText = playerData.data.armor.toString();
    this.power.innerText = playerData.data.power.toString();

    for (let index = 0; index < 9; index++) {
      let path: string | null = '';
      const inv = document.getElementById(`inv-img-${index + 1}`) as HTMLImageElement;
      const item = playerData.data.inventory[index];
      if (item) {
        switch (item.type) {
          case ItemType.Potion: {
            path = this.assets.find((x) => x.type === RenderType.Potion)?.path ?? null;
            break;
          }
          case ItemType.Scroll: {
            path = this.assets.find((x) => x.type === RenderType.Scroll)?.path ?? null;
            break;
          }
          case ItemType.Armor: {
            path = this.assets.find((x) => x.type === (item as IArmor).renderType)?.path ?? null;
            break;
          }
          case ItemType.Weapon: {
            path = this.assets.find((x) => x.type === (item as IWeapon).renderType)?.path ?? null;
            break;
          }
        }
      }
      inv.src = path ?? '';
    }

    for (const equipmentItem of playerData.data.equipment) {
      if (equipmentItem.item) {
        switch (equipmentItem.equipmentType) {
          case EquipmentType.Head: {
            (document.getElementById(`head-img`) as HTMLImageElement).src =
              this.assets.find((x) => x.type === RenderType.Head)?.path ?? '';
            break;
          }
          case EquipmentType.Body: {
            (document.getElementById(`body-img`) as HTMLImageElement).src =
              this.assets.find((x) => x.type === RenderType.Body)?.path ?? '';
            break;
          }
          case EquipmentType.Legs: {
            (document.getElementById(`legs-img`) as HTMLImageElement).src =
              this.assets.find((x) => x.type === RenderType.Legs)?.path ?? '';
            break;
          }
          case EquipmentType.LeftHand: {
            (document.getElementById(`left-hand-img`) as HTMLImageElement).src =
              this.assets.find((x) => x.type === RenderType.LeftHand)?.path ?? '';
            break;
          }
          case EquipmentType.RightHand: {
            (document.getElementById(`right-hand-img`) as HTMLImageElement).src =
              this.assets.find((x) => x.type === RenderType.RightHand)?.path ?? '';
            break;
          }
        }
      } else {
        switch (equipmentItem.equipmentType) {
          case EquipmentType.Head: {
            (document.getElementById(`head-img`) as HTMLImageElement).src = '';
            break;
          }
          case EquipmentType.Body: {
            (document.getElementById(`body-img`) as HTMLImageElement).src = '';
            break;
          }
          case EquipmentType.Legs: {
            (document.getElementById(`legs-img`) as HTMLImageElement).src = '';
            break;
          }
          case EquipmentType.LeftHand: {
            (document.getElementById(`left-hand-img`) as HTMLImageElement).src = '';
            break;
          }
          case EquipmentType.RightHand: {
            (document.getElementById(`right-hand-img`) as HTMLImageElement).src = '';
            break;
          }
        }
      }
    }
  }
}
