import { ItemType } from '../enums/ItemEnum';
import { IPlayer } from './IPlayer';

export interface IItem {
  id: string;
  type: ItemType;

  do(player: IPlayer): IPlayer;
}
