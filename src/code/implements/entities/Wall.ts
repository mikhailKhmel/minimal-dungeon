import { EntityType } from '../../enums/EntityType';
import { IEntity } from '../../interfaces/IEntity';
import { RenderType } from '../../enums/RenderType';
import { randchoose } from '../../../utils';

export class Wall implements IEntity {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Wall;
  renderType: RenderType;
  light = false;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.renderType = randchoose([RenderType.Wall, RenderType.Wall1, RenderType.Wall2]);
  }
}
