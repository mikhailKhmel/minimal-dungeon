import { ItemType } from '../../enums/ItemEnum';
import { IItem } from '../../interfaces/IItem';
import { IPlayer } from '../../interfaces/IPlayer';

export class Armor implements IItem {
  id = '';
  type: ItemType = ItemType.Armor;

  constructor() {
    this.id = crypto.randomUUID();
  }

  do(player: IPlayer) {
    player.data.armor += 1;
    return player;
  }
}
