import {IEntity} from "./IEntity"

export interface IPlayer extends IEntity {
    data: {
        hp: number,
        power: number,
        armor: number
    }
}
