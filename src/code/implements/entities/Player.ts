import { EntityType } from '../../enums/EntityType';
import { IPlayer } from '../../interfaces/IPlayer';
import { RenderType } from '../../enums/RenderType';
import { IItem } from '../../interfaces/IItem';
import { EquipmentType } from '../../enums/EquipmentType';
import { IWeapon } from '../../interfaces/IWeapon';
import { IArmor } from '../../interfaces/IArmor';

export class Player implements IPlayer {
  id: string;
  x: number;
  y: number;
  type: EntityType = EntityType.Player;
  renderType: RenderType = RenderType.PlayerDown1;
  data: {
    hp: number;
    power: number;
    armor: number;
    inventory: Array<IItem>;
    equipment: Array<{ equipmentType: EquipmentType; item: IWeapon | IArmor | null }>;
  };
  light = false;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.data = {
      hp: 20,
      power: 1,
      armor: 0,
      inventory: [],
      equipment: [
        { equipmentType: EquipmentType.Head, item: null },
        { equipmentType: EquipmentType.Body, item: null },
        { equipmentType: EquipmentType.Legs, item: null },
        { equipmentType: EquipmentType.LeftHand, item: null },
        { equipmentType: EquipmentType.RightHand, item: null },
      ],
    };
  }
}
