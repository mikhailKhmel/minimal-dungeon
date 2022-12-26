import { ItemType } from '../../enums/ItemEnum';
import { IItem } from '../../interfaces/IItem';
import { IPlayer } from '../../interfaces/IPlayer';

export class Weapon implements IItem {
  id = '';
  type: ItemType = ItemType.Weapon;

  constructor() {
    this.id = crypto.randomUUID();
  }

  do(player: IPlayer) {
    player.data.power += 1;
    return player;
  }
}
