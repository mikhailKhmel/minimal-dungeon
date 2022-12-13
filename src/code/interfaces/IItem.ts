import { ItemType } from "../common/ItemEnum";
import { IPlayer } from "./IPlayer";


export interface IItem {
    id: string,
    type: ItemType,
    do(player: IPlayer): IPlayer,
}