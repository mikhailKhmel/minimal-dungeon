import {EntityType} from "./code/common/EntityEnum";
import {IEntity} from "./code/interfaces/IEntity";

export function randint(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randchoose<T>(arr: Array<T>): T {
    return arr[randint(0, arr.length - 1)];
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(r => {
        let i = new Image();
        i.onload = (() => r(i));
        i.src = url;
    });
}

export function tick(fps: number): number {
    return (1 / fps) * 1000;
}

export function range(min: number, max: number): Array<number> {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}

// export function uuidv4(): string {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(
//           16),
//   );
// }

export function calcLightZone(data: Array<IEntity>): Array<IEntity> {
    const player = data.find(x => x.type === EntityType.Player)!;
    const x1 = player.x - 3;
    const x2 = player.x + 3;
    const y1 = player.y - 3;
    const y2 = player.y + 3;

    for (const datum of data) {
        if (!datum.light) {
            datum.light = datum.x >= x1 && datum.y >= y1 && datum.x <= x2 &&
                datum.y <= y2;
        }
    }
    return data;
}