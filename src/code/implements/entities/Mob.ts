import { EntityType } from '../../enums/EntityType';
import { IMob } from '../../interfaces/IMob';
import { randint } from '../../../utils';
import { RenderType } from '../../enums/RenderType';

export class Mob implements IMob {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Mob;
  renderType: RenderType = RenderType.MobDown1;
  data: { hp: number; power: number };
  light = false;

  constructor(x: number, y: number, level: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.data = { hp: randint(level + 2, level + 4), power: randint(level, level + 1) };
  }
}
