import { EquipmentType } from '../enums/EquipmentType';
import { IItem } from './IItem';
import { IPlayer } from './IPlayer';

export interface IWeapon extends IItem {
  weaponType: EquipmentType;
  powerCount: number;
  undo(player: IPlayer): IPlayer;
}
