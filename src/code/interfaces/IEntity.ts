import { EntityType } from '../enums/EntityType';
import { RenderType } from '../enums/RenderType';

export interface IEntity {
  id: string;
  x: number;
  y: number;
  type: EntityType;
  renderType: RenderType;
  light: boolean;
}
