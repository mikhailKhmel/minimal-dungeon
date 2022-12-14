import {EntityType} from "../common/EntityEnum";
import {v4 as uuid} from 'uuid';
import {IPlayer} from '../interfaces/IPlayer';
import {RenderType} from "../common/RenderEnum";
import {IItem} from "../interfaces/IItem";


export class Player implements IPlayer {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Player;
    renderType: RenderType = RenderType.PlayerDown1;
    data: { hp: number; power: number; armory: number; inventory: Array<IItem> };
    light: Boolean = false;

    constructor(x: number, y: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
        this.data = {hp: 10, power: 1, armory: 0, inventory: []};
    }
}