import { EquipmentType } from '../enums/EquipmentType';
import { IItem } from './IItem';
import { IPlayer } from './IPlayer';

export interface IArmor extends IItem {
  armorType: EquipmentType;
  armorCount: number;
  undo(player: IPlayer): IPlayer;
}
