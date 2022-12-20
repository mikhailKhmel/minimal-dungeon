import {EntityType} from "../enums/EntityEnum";
import {v4 as uuid} from 'uuid';
import {IMob} from "../interfaces/IMob";
import {randint} from "../../utils";
import {RenderType} from "../enums/RenderEnum";


export class Boss implements IMob {
    id: string;
    x: number;
    y: number;
    type: EntityType = EntityType.Boss;
    renderType: RenderType = RenderType.BossDown1;
    data: { hp: number; power: number; };
    light: Boolean = false;

    constructor(x: number, y: number, level: number) {
        this.id = uuid();
        this.x = x;
        this.y = y;
        this.data = {hp: randint(level + 7, level + 10), power: randint(level + 2, level + 4)};
    }
}