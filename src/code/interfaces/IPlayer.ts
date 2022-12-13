import {IEntity} from "./IEntity"
import { IItem } from "./IItem"

export interface IPlayer extends IEntity {
    data: {
        hp: number,
        power: number,
        armory: number,
        inventory: Array<IItem>
    }
}
