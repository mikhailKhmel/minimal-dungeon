import {v4} from "uuid";
import {ItemType} from "../enums/ItemEnum";
import {IItem} from "../interfaces/IItem";
import {IPlayer} from "../interfaces/IPlayer";
import ls from "../localstorage";

export class Scroll implements IItem {
    id: string = '';
    type: ItemType = ItemType.Scroll;

    constructor() {
        this.id = v4();
    }

    do(player: IPlayer) {
        ls.allVisible = true;
        setTimeout(() => {
            ls.allVisible = false;
        }, 1000 * 10);
        return player;
    };


}