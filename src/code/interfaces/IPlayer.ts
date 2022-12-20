import {IEntity} from "./IEntity"
import {IItem} from "./IItem"

export interface IPlayer extends IEntity {
    data: {
        hp: number,
        power: number,
        armor: number,
        inventory: Array<IItem>
    }
}
