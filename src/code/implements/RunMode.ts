import { EntityType } from "../common/EntityEnum";
import { FPS, GameModes, HEIGHT, WIDTH } from "../Constants";
import { EntitiesFiller } from "../EntitiesFiller";
import { Player } from "./Player";
import { IEntity } from "../interfaces/IEntity";
import { MapGenerator } from "../MapGenerator";
import { MapWorker } from "../MapWorker";
import { Render } from "../Render";
import { sleep, tick } from "../../utils";

export class RunMode {
    context: CanvasRenderingContext2D | null = null;
    entitiesGenerator: EntitiesFiller;
    mapGenerator: MapGenerator;
    render: Render;
    mapWorker: MapWorker;
    mapData: Array<IEntity> = [];
    lastKeyCode: string = '';
    level: number = 1;
    changeMode: Function | null = null;

    constructor(changeMode: Function) {

        this.entitiesGenerator = new EntitiesFiller();
        this.mapGenerator = new MapGenerator();
        this.render = new Render();
        this.mapWorker = new MapWorker();
        this.changeMode = changeMode;

        window.addEventListener('keydown', (e) => {
            this.lastKeyCode = e.code;
        });
    }

    async show(): Promise<void> {
        document.getElementById('app')!.innerHTML = `
        <div class="container-xl">
        <div class="row">
            <div class="col-8">
                <canvas id="game"></canvas>
            </div>
            <div class="col-4">
                <div class="container px-4">
                    <div class="row gx-5">
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Здоровье</h5>
                                    <p class="card-text" id="hp"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Броня</h5>
                                    <p class="card-text" id="armory"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5">
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Сила</h5>
                                    <p class="card-text" id="power"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        const game = document.getElementById('game') as HTMLCanvasElement;
        game.width = WIDTH;
        game.height = HEIGHT;
        this.context = game.getContext('2d') as CanvasRenderingContext2D;
        await this.render.loadImages();
    }
    createMap() {
        this.mapData = this.entitiesGenerator.generate(this.mapGenerator.createMap(), this.level);
    }

    public async go(): Promise<void> {
        this.createMap();
        while (true) {
            await sleep(tick(FPS));
            this.render.renderMap(this.context!, this.mapData);
            this.render.renderInfo(
                (this.mapData.find(x => x.type === EntityType.Player) as Player).data);
            this.mapWorker.go(this.mapData, this.lastKeyCode);
            this.lastKeyCode = '';

            if (this.mapWorker.gameOver) {
                break;
            }

            if (this.mapWorker.isNewLevel) {
                this.mapWorker.isNewLevel = false;
                this.level++;
                this.context!.fillRect(0, 0, WIDTH, HEIGHT);
                this.createMap();
            }
        }
        this.changeMode!(GameModes.GAMEOVER);
    }
}