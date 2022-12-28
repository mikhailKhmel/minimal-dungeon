import { ItemType } from '../enums/ItemType';
import { RenderType } from '../enums/RenderType';
import { IPlayer } from './IPlayer';

export interface IItem {
  id: string;
  title: string;
  type: ItemType;
  renderType: RenderType;

  do(player: IPlayer): IPlayer;
  info(): string;
}
