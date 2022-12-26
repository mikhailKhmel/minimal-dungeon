import { EntityType } from '../../enums/EntityEnum';
import { IPlayer } from '../../interfaces/IPlayer';
import { RenderType } from '../../enums/RenderEnum';
import { IItem } from '../../interfaces/IItem';

export class Player implements IPlayer {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Player;
  renderType: RenderType = RenderType.PlayerDown1;
  data: { hp: number; power: number; armor: number; inventory: Array<IItem> };
  light = false;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.data = { hp: 20, power: 1, armor: 0, inventory: [] };
  }
}