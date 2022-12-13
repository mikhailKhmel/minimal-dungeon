import { randint } from "../utils";
import { ItemType } from "./common/ItemEnum";
import { Armory } from "./implements/Armory";
import { Potion } from "./implements/Potion";
import { Weapon } from "./implements/Weapon";
import { IItem } from "./interfaces/IItem";

export class ItemCreator {
    create(): IItem {
        const type = randint(0, 2);
        switch (type) {
            case ItemType.Armory: {
                return new Armory();
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