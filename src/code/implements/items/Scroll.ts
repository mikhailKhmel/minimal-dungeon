import { ItemType } from '../../enums/ItemType';
import { RenderType } from '../../enums/RenderType';
import { IItem } from '../../interfaces/IItem';
import { IPlayer } from '../../interfaces/IPlayer';
import ls from '../../localstorage';

export class Scroll implements IItem {
  id = '';
  title = 'Заклинание развеивания тумана';
  type: ItemType = ItemType.Scroll;
  renderType: RenderType = RenderType.Scroll;

  constructor() {
    this.id = crypto.randomUUID();
  }

  info(): string {
    return 'Расширяет область видимости и убирает туман на 5 секунд';
  }

  do(player: IPlayer) {
    ls.allVisible = true;
    setTimeout(() => {
      ls.allVisible = false;
    }, 1000 * 5);
    return player;
  }
}
