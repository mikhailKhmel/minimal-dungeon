import { ItemType } from '../../enums/ItemEnum';
import { IItem } from '../../interfaces/IItem';
import { IPlayer } from '../../interfaces/IPlayer';
import ls from '../../localstorage';

export class Scroll implements IItem {
  id = '';
  type: ItemType = ItemType.Scroll;

  constructor() {
    this.id = crypto.randomUUID();
  }

  do(player: IPlayer) {
    ls.allVisible = true;
    setTimeout(() => {
      ls.allVisible = false;
    }, 1000 * 10);
    return player;
  }
}
