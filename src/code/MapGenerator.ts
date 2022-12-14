import {randint} from "../utils";
import {MAP_SIZE} from "./Constants";

class Room {
    x1: number;
    x2: number;
    y1: number;
    y2: number;

    constructor(x1: number, x2: number, y1: number, y2: number) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
}

export class MapGenerator {
    maps: Array<Array<string>>;
    rooms: Array<Room>;
    centers: Array<Array<number>>;

    constructor() {
        this.maps = [];
        this.rooms = [];
        this.centers = [];
    }

    public createMap() {
        this.cleanMap();
        this.genRooms();
        this.spawnPlayer();
        this.spawnMobs();
        this.spawnLadder();
        this.spawnChests();

        return this.maps;
    }

    private checkIntersection(r: Room, newRoom: Room) {
        return r.x1 <= newRoom.x2 && r.x2 >= newRoom.x1 && r.y1 <= newRoom.y2 &&
            r.y2 >= newRoom.y1;
    }

    private spawnChests() {
        let chestCount = randint(this.rooms.length, this.rooms.length + 2);
        let c = 0
        while (c < chestCount) {
            if (this.maps && this.maps.length !== 0) {
                const rndRoom = this.rooms[randint(0, this.rooms.length - 1)];
                const rndX = randint(rndRoom.x1, rndRoom.x2 - 1);
                const rndY = randint(rndRoom.y1, rndRoom.y2 - 1);
                if (this.maps[rndX][rndY] === '0') {
                    this.maps[rndX][rndY] = '5';
                    c++;
                }
            }
        }
    }

    private spawnLadder() {
        let c: number = 0;
        while (c < 1) {
            if (this.maps && this.maps.length !== 0) {
                const rndRoom = this.rooms[randint(0, this.rooms.length - 1)];
                const rndX = randint(rndRoom.x1, rndRoom.x2 - 1);
                const rndY = randint(rndRoom.y1, rndRoom.y2 - 1);
                if (this.maps[rndX][rndY] === '0') {
                    this.maps[rndX][rndY] = '4';
                    c++;
                }
            }
        }
    }

    private spawnMobs() {
        const mobsCount = randint(this.rooms.length - 3, this.rooms.length + 2);
        let c = 0;
        while (c < mobsCount) {
            const rndX = randint(0, this.maps.length - 1);
            const rndY = randint(0, this.maps.length - 1);
            if (this.maps[rndX][rndY] === '0') {
                this.maps[rndX][rndY] = '3';
                c++;
            }
        }
    }

    private spawnPlayer(): void {
        let c = 0;
        while (c < 1) {
            if (this.maps && this.maps.length !== 0) {
                const rndRoom = this.rooms[randint(0, this.rooms.length - 1)];
                const rndX = randint(rndRoom.x1, rndRoom.x2 - 1);
                const rndY = randint(rndRoom.y1, rndRoom.y2 - 1);
                if (this.maps[rndX][rndY] === '0') {
                    this.maps[rndX][rndY] = '2';
                    c++;
                }
            }
        }
    }

    private cleanMap(): void {
        this.maps = [];
        this.rooms = [];
        this.centers = [];
        for (let i = 0; i < MAP_SIZE; i++) {
            const map = [];
            for (let j = 0; j < MAP_SIZE; j++) {
                map.push('1');
            }
            this.maps.push(map);
        }
    }

    private genRooms(): void {
        const countOfRoom = randint(10, 15);
        let n = 0;

        while (n < countOfRoom) {
            const w = randint(4, 10);
            const h = randint(4, 10);
            const x1 = randint(1, MAP_SIZE - w - 1);
            const x2 = x1 + w;
            const y1 = randint(1, MAP_SIZE - h - 1);
            const y2 = y1 + h;
            const newRoom = new Room(x1, x2, y1, y2);
            let failed = false;

            for (let r of this.rooms) {
                if (this.checkIntersection(r, newRoom)) {
                    failed = true;
                    break;
                }
            }

            if (failed) {
                continue;
            }

            this.rooms.push(newRoom);
            this.centers.push([Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2)]);

            for (let i = x1; i < x2; i++) {
                for (let j = y1; j < y2; j++) {
                    this.maps[i][j] = '0';
                }
            }

            if (n !== 0) {
                this.genTunnels(n);
            }
            n++;
        }
    }

    private genTunnels(n: number): void {
        const firstCenter = this.centers[n - 1];
        const secondCenter = this.centers[n];

        for (let i = Math.min(firstCenter[0], secondCenter[0]); i <
        Math.max(firstCenter[0], secondCenter[0]) + 1; i++) {
            this.maps[i][secondCenter[1]] = '0';
        }
        for (let i = Math.min(firstCenter[1], secondCenter[1]); i <
        Math.max(firstCenter[1], secondCenter[1]) + 1; i++) {
            this.maps[firstCenter[0]][i] = '0';
        }
    }
}