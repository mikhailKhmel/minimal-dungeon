import { calcLightZone } from '../utils';
import { EntityType } from './enums/EntityType';
import { EntityCreator } from './EntityCreator';
import { Player } from './implements/entities/Player';
import { IEntity } from './interfaces/IEntity';

export class EntitiesFiller {
  data: Array<IEntity> = [];

  public generate(maps: Array<Array<string>>, level: number) {
    if (level === 1) {
      this.fillData(maps, level);
    } else {
      const playerOldData = (this.data.find((x) => x.type === EntityType.Player) as Player).data;
      this.fillData(maps, level);
      (this.data[this.data.findIndex((x) => x.type === EntityType.Player)] as Player).data = playerOldData;
    }

    return calcLightZone(this.data);
  }

  private fillData(maps: Array<Array<string>>, level: number) {
    this.data = [];
    for (let i = 0; i < maps.length; i++) {
      for (let j = 0; j < maps[i].length; j++) {
        const mapItem = maps[i][j];
        this.data.push(EntityCreator.create(parseInt(mapItem), i, j, level));
      }
    }
  }
}
