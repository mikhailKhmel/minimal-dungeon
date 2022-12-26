import {EntityType} from "../enums/EntityEnum";
import {RenderType} from "../enums/RenderEnum";

export interface IEntity {
    id: string,
    x: number,
    y: number,
    type: EntityType,
    renderType: RenderType,
    light: boolean
}