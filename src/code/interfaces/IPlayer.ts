import { EquipmentType } from '../enums/EquipmentType';
import { IArmor } from './IArmor';
import { IEntity } from './IEntity';
import { IItem } from './IItem';
import { IWeapon } from './IWeapon';

export interface IPlayer extends IEntity {
  data: {
    hp: number;
    power: number;
    armor: number;
    inventory: Array<IItem>;
    equipment: Array<{ equipmentType: EquipmentType; item: IWeapon | IArmor | null }>;
  };
}
