import { randchoose, randint } from '../../../utils';
import { EquipmentType } from '../../enums/EquipmentType';
import { ItemType } from '../../enums/ItemType';
import { RenderType } from '../../enums/RenderType';
import { IArmor } from '../../interfaces/IArmor';
import { IPlayer } from '../../interfaces/IPlayer';
import ls from '../../LocalStorage';

export class Armor implements IArmor {
  id = '';
  title = 'Броня';
  type: ItemType = ItemType.Armor;
  armorType: EquipmentType;
  renderType: RenderType;
  armorCount: number;

  constructor() {
    this.id = crypto.randomUUID();
    this.armorType = randchoose([EquipmentType.Body, EquipmentType.Head, EquipmentType.Legs]);
    switch (this.armorType) {
      case EquipmentType.Body: {
        this.renderType = RenderType.Body;
        break;
      }
      case EquipmentType.Head: {
        this.renderType = RenderType.Head;
        break;
      }
      case EquipmentType.Legs: {
        this.renderType = RenderType.Legs;
        break;
      }
      default: {
        throw new Error('Неверный тип брони');
      }
    }

    this.armorCount = randint(ls.level, ls.level + 3);
  }

  undo(player: IPlayer): IPlayer {
    const equipmentIndex = player.data.equipment.findIndex((x) => x.equipmentType === this.armorType);
    if (equipmentIndex >= 0) {
      if (player.data.inventory.length < 9) {
        player.data.inventory.push(this);
      }
      player.data.equipment[equipmentIndex] = {
        equipmentType: this.armorType,
        item: null,
      };
      player.data.armor -= this.armorCount;
    }

    return player;
  }

  do(player: IPlayer) {
    const equipmentIndex = player.data.equipment.findIndex((x) => x.equipmentType === this.armorType);
    if (equipmentIndex >= 0 && player.data.equipment[equipmentIndex]) {
      if (!player.data.equipment[equipmentIndex].item) {
        player.data.equipment[equipmentIndex] = {
          equipmentType: this.armorType,
          item: this,
        };
        if (player.data.armor + this.armorCount >= 0) {
          player.data.armor += this.armorCount;
        }
      }
    }

    return player;
  }

  info(): string {
    return `Защита ${this.armorCount >= 0 ? `+${this.armorCount}` : this.armorCount}`;
  }
}
