import { IEntity } from './IEntity';

export interface IMob extends IEntity {
  data: {
    hp: number;
    power: number;
  };
}
