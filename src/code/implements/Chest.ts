import {EntityType} from "../enums/EntityEnum";
import {IEntity} from "../interfaces/IEntity";
import {v4 as uuid} from 'uuid';
import {RenderType} from "../enums/RenderEnum";


export class Chest implements IEntity {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Chest;
    renderType: RenderType = RenderType.Chest;
    light: Boolean = false;

    constructor(x: number, y: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
    }

}