import { v4 } from "uuid";
import { ItemType } from "../common/ItemEnum";
import { IItem } from "../interfaces/IItem";
import { IPlayer } from "../interfaces/IPlayer";

export class Armory implements IItem {
    id: string = '';
    type: ItemType = ItemType.Armory;

    constructor() {
        this.id = v4();
    }

    do(player: IPlayer) {
        player.data.armory += 1;
        return player;
    };
}