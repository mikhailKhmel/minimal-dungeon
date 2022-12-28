import { EntityType } from './enums/EntityType';
import { Boss } from './implements/entities/Boss';
import { Chest } from './implements/entities/Chest';
import { Ladder } from './implements/entities/Ladder';
import { Mob } from './implements/entities/Mob';
import { Player } from './implements/entities/Player';
import { Void } from './implements/entities/Void';
import { Wall } from './implements/entities/Wall';
import { IEntity } from './interfaces/IEntity';

export class EntityCreator {
  public static create(type: EntityType, x: number, y: number, level: number): IEntity {
    switch (type) {
      case EntityType.Void:
        return new Void(x, y);
      case EntityType.Chest:
        return new Chest(x, y);
      case EntityType.Ladder:
        return new Ladder(x, y);
      case EntityType.Wall:
        return new Wall(x, y);
      case EntityType.Mob:
        return new Mob(x, y, level);
      case EntityType.Player:
        return new Player(x, y);
      case EntityType.Boss:
        return new Boss(x, y, level);
      default:
        throw new Error('нет такой сущности');
    }
  }
}
