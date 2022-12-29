import { randint } from '../../../utils';
import { ItemType } from '../../enums/ItemType';
import { RenderType } from '../../enums/RenderType';
import { IPlayer } from '../../interfaces/IPlayer';
import { IPotion } from '../../interfaces/IPotion';

export class Potion implements IPotion {
  id = '';
  title = 'Зелье';
  type: ItemType = ItemType.Potion;
  renderType: RenderType = RenderType.Potion;
  hpCount: number;

  constructor() {
    this.id = crypto.randomUUID();
    this.hpCount = randint(1, 3);
  }

  do(player: IPlayer) {
    player.data.hp += this.hpCount;
    return player;
  }

  info(): string {
    return `Здоровье +${this.hpCount}`;
  }
}
