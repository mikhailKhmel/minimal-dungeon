import { randchoose, randint } from '../../../utils';
import { EquipmentType } from '../../enums/EquipmentType';
import { ItemType } from '../../enums/ItemType';
import { RenderType } from '../../enums/RenderType';
import { IPlayer } from '../../interfaces/IPlayer';
import { IWeapon } from '../../interfaces/IWeapon';
import ls from '../../LocalStorage';

export class Weapon implements IWeapon {
  id = '';
  title = 'Оружие';
  type: ItemType = ItemType.Weapon;
  powerCount: number;
  renderType: RenderType;
  weaponType: EquipmentType;

  constructor() {
    this.id = crypto.randomUUID();
    this.weaponType = randchoose([EquipmentType.LeftHand, EquipmentType.RightHand]);

    switch (this.weaponType) {
      case EquipmentType.LeftHand: {
        this.renderType = RenderType.LeftHand;
        break;
      }
      case EquipmentType.RightHand: {
        this.renderType = RenderType.RightHand;
        break;
      }
      default: {
        throw new Error('Неверный тип брони');
      }
    }

    this.powerCount = randint(ls.level, ls.level + 3);
  }
  undo(player: IPlayer): IPlayer {
    const equipmentIndex = player.data.equipment.findIndex((x) => x.equipmentType === this.weaponType);
    if (equipmentIndex >= 0) {
      if (player.data.inventory.length < 9) {
        player.data.inventory.push(this);
      }
      player.data.equipment[equipmentIndex] = {
        equipmentType: this.weaponType,
        item: null,
      };
      player.data.power -= this.powerCount;
    }

    return player;
  }

  info(): string {
    return `Сила ${this.powerCount >= 0 ? `+${this.powerCount}` : this.powerCount}`;
  }

  do(player: IPlayer) {
    const equipmentIndex = player.data.equipment.findIndex((x) => x.equipmentType === this.weaponType);
    if (equipmentIndex >= 0) {
      if (!player.data.equipment[equipmentIndex].item) {
        player.data.equipment[equipmentIndex] = {
          equipmentType: this.weaponType,
          item: this,
        };
        if (player.data.power + this.powerCount >= 1) {
          player.data.power += this.powerCount;
        }
      }
    }

    return player;
  }
}
