import { EntityType } from '../../enums/EntityType';
import { IEntity } from '../../interfaces/IEntity';
import { RenderType } from '../../enums/RenderType';

export class Ladder implements IEntity {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Ladder;
  renderType: RenderType = RenderType.Ladder;
  light = false;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
  }
}
