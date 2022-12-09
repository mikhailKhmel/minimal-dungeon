import {EntityType} from "../common/EntityEnum";
import {RenderType} from "../common/RenderEnum";

export interface IEntity {
    id: string,
    x: number,
    y: number,
    type: EntityType,
    renderType: RenderType,
    light: Boolean
}