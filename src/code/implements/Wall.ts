import {EntityType} from "../enums/EntityEnum";
import {IEntity} from "../interfaces/IEntity";
import {v4 as uuid} from 'uuid';
import {RenderType} from "../enums/RenderEnum";
import {randchoose} from "../../utils";


export class Wall implements IEntity {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Wall;
    renderType: RenderType;
    light: Boolean = false;

    constructor(x: number, y: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
        this.renderType = randchoose([RenderType.Wall, RenderType.Wall1, RenderType.Wall2]);
    }
}