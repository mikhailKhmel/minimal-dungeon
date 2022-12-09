import {EntityType} from "./common/EntityEnum";
import {Chest} from "./implements/Chest";
import {Ladder} from "./implements/Ladder";
import {Mob} from "./implements/Mob";
import {Player} from "./implements/Player";
import {Void} from "./implements/Void";
import {Wall} from "./implements/Wall";
import {IEntity} from "./interfaces/IEntity";

export class EntityCreator {
    type: EntityType;
    x: number;
    y: number;
    level: number;

    constructor(type: EntityType, x: number, y: number, level: number) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.level = level;
    }

    /**
     * CreateEntity
     */
    public CreateEntity(): IEntity {
        switch (this.type) {
            case EntityType.Void:
                return new Void(this.x, this.y);
            case EntityType.Chest:
                return new Chest(this.x, this.y);
            case EntityType.Ladder:
                return new Ladder(this.x, this.y);
            case EntityType.Wall:
                return new Wall(this.x, this.y);
            case EntityType.Mob:
                return new Mob(this.x, this.y, this.level);
            case EntityType.Player:
                return new Player(this.x, this.y);
            default:
                throw new Error('нет такой сущности');
        }
    }
}