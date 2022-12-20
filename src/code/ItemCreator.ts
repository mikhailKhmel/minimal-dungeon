import { randint } from "../utils";
import { ItemType } from "./enums/ItemEnum";
import { Armor } from "./implements/Armor";
import { Potion } from "./implements/Potion";
import { Weapon } from "./implements/Weapon";
import { IItem } from "./interfaces/IItem";

export class ItemCreator {
    create(): IItem {
        const rnd = randint(1, 100);
        let type: ItemType;

        if (rnd > 0 && rnd < 60) {
            type = ItemType.Potion;
        } else if (rnd >= 60 && rnd < 80) {
            type = ItemType.Weapon;
        } else {
            type = ItemType.Armor;
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
            default: {
                throw new Error();
            }
        }
    }
}