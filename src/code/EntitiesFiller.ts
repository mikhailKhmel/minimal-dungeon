import {calcLightZone} from "../utils";
import {EntityType} from "./common/EntityEnum";
import {EntityCreator} from "./EntityCreator";
import {Player} from "./implements/Player";
import {IEntity} from "./interfaces/IEntity";

export class EntitiesFiller {
    data: Array<IEntity> = [];

    public generate(maps: Array<Array<string>>, level: number) {
        if (this.data.length === 0 && level === 1) {
            this.fillData(maps, level);
        } else {
            const playerOldData = (this.data.find(
                x => x.type === EntityType.Player) as Player).data;
            this.fillData(maps, level);
            (this.data[this.data.findIndex(x => x.type === EntityType.Player)] as Player).data = playerOldData;
        }

        return calcLightZone(this.data);
    }

    private fillData(maps: Array<Array<string>>, level: number) {
        this.data = [];
        for (let i = 0; i < maps.length; i++) {
            for (let j = 0; j < maps[i].length; j++) {
                const mapItem = maps[i][j];
                const entityCreator = new EntityCreator(parseInt(mapItem), i, j, level);
                this.data.push(entityCreator.CreateEntity());
            }
        }
    }
}