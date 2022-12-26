import { randint } from '../utils';
import { ItemType } from './enums/ItemEnum';
import { Armor } from './implements/items/Armor';
import { Potion } from './implements/items/Potion';
import { Scroll } from './implements/items/Scroll';
import { Weapon } from './implements/items/Weapon';
import { IItem } from './interfaces/IItem';

export class ItemCreator {
  static create(type: ItemType | null = null): IItem {
    if (type === null) {
      const rnd = randint(1, 100);

      if (rnd > 0 && rnd < 60) {
        type = ItemType.Potion;
      } else if (rnd >= 60 && rnd < 80) {
        type = ItemType.Weapon;
      } else {
        type = ItemType.Armor;
      }
    }

    switch (type) {
      case ItemType.Armor: {
        return new Armor();
      }
      case ItemType.Weapon: {
        return new Weapon();
      }
      case ItemType.Potion: {
        return new Potion();
      }
      case ItemType.Scroll: {
        return new Scroll();
      }
      default: {
        throw new Error();
      }
    }
  }
}
