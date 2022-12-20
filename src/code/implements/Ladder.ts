import {EntityType} from "../enums/EntityEnum";
import {IEntity} from "../interfaces/IEntity";
import {v4 as uuid} from 'uuid';
import {RenderType} from "../enums/RenderEnum";


export class Ladder implements IEntity {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Ladder;
    renderType: RenderType = RenderType.Ladder;
    light: Boolean = false;

    constructor(x: number, y: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
    }
}