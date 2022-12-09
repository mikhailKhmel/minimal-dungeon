import {EntityType} from "../common/EntityEnum";
import {IEntity} from "../interfaces/IEntity";
import {v4 as uuid} from 'uuid';
import {RenderType} from "../common/RenderEnum";
import {randchoose} from "../../utils";


export class Void implements IEntity {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Void;
    renderType: RenderType;
    light: Boolean = false;

    constructor(x: number, y: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
        this.renderType = randchoose([RenderType.Void, RenderType.Void1, RenderType.Void2]);
    }
}