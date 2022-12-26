import {v4} from "uuid";
import {randint} from "../../utils";
import {ItemType} from "../enums/ItemEnum";
import {IItem} from "../interfaces/IItem";
import {IPlayer} from "../interfaces/IPlayer";

export class Potion implements IItem {
    id = '';
    type: ItemType = ItemType.Potion;

    constructor() {
        this.id = v4();
    }

    do(player: IPlayer) {
        player.data.hp += randint(1, 3);
        return player;
    }


}