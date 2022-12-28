import { EntityType } from '../../enums/EntityType';
import { IEntity } from '../../interfaces/IEntity';
import { RenderType } from '../../enums/RenderType';

export class Chest implements IEntity {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Chest;
  renderType: RenderType = RenderType.Chest;
  light = false;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
  }
}
