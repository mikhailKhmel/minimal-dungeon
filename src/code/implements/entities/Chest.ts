import { EntityType } from '../../enums/EntityEnum';
import { IEntity } from '../../interfaces/IEntity';
import { RenderType } from '../../enums/RenderEnum';

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
