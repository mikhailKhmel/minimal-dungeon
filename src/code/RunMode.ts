import { EntityType } from "./enums/EntityEnum";
import { FPS, GameModes, HEIGHT, WIDTH } from "./Constants";
import { EntitiesFiller } from "./EntitiesFiller";
import { Player } from "./implements/Player";
import { IEntity } from "./interfaces/IEntity";
import { MapGenerator } from "./MapGenerator";
import { MapWorker } from "./MapWorker";
import { Render } from "./Render";
import { tick } from "../utils";
import { IPlayer } from "./interfaces/IPlayer";
import ls from "./localstorage";

export class RunMode {
    context: CanvasRenderingContext2D | null = null;
    entitiesGenerator: EntitiesFiller;
    mapGenerator: MapGenerator;
    render: Render | null = null;
    mapWorker: MapWorker;
    mapData: Array<IEntity> = [];
    lastKeyCode: string = '';
    level: number = 1;
    changeMode: Function | null = null;
    pause: Boolean = false;

    constructor(changeMode: Function, render: Render) {

        this.entitiesGenerator = new EntitiesFiller();
        this.mapGenerator = new MapGenerator();
        this.mapWorker = new MapWorker();
        this.changeMode = changeMode;
        this.render = render;

        ls.killedMobs = 0;

        window.addEventListener('keydown', (e) => {
            this.lastKeyCode = e.code;
        });
    }

    async show(): Promise<void> {
        document.getElementById('app')!.innerHTML = `
        <div class="container-xl mt-2">
        <div class="row">
            <div class="col-8">
                <canvas id="game"></canvas>
            </div>
            <div class="col-4">
                <div class="container px-4">
                <div class="row gx-5">
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body text-center">
                                    <button id="pause-btn" class="btn btn-warning">ПАУЗА</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5">
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Уровень</h5>
                                    <p class="card-text" id="level"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Количество сундуков</h5>
                                    <p class="card-text" id="chests"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col p-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Количество монстров</h5>
                                    <p class="card-text" id="mobs"></p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div class="row gx-5">
                        <div id="inventory" class="container">
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-1" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-2" class="rounded mx-auto"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-3" class="rounded mx-auto"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-4" class="rounded mx-auto"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-5" class="rounded mx-auto"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-6" class="rounded mx-auto"/>
                                        </div>
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
        this.render?.loadInfo();
    }

    createMap() {
        this.mapData = this.entitiesGenerator.generate(this.mapGenerator.createMap(), this.level);
    }

    applyItem(invIndex: number) {
        let player = this.mapData.find(x => x.type === EntityType.Player) as IPlayer;
        let inv = player.data.inventory;
        if (inv[invIndex]) {
            player = inv[invIndex].do(player);
            player.data.inventory = inv.filter((item) => item.id !== inv[invIndex].id);
        }
    }

    public async go(): Promise<void> {
        document.getElementById('inv-1')?.addEventListener('click', () => {
            this.applyItem(0);
        });
        document.getElementById('inv-2')?.addEventListener('click', () => {
            this.applyItem(1);
        });
        document.getElementById('inv-3')?.addEventListener('click', () => {
            this.applyItem(2);
        });
        document.getElementById('inv-4')?.addEventListener('click', () => {
            this.applyItem(3);
        });
        document.getElementById('inv-5')?.addEventListener('click', () => {
            this.applyItem(4);
        });
        document.getElementById('inv-6')?.addEventListener('click', () => {
            this.applyItem(5);
        });
        document.getElementById('pause-btn')?.addEventListener('click', () => {
            this.pause = !this.pause;
            document.getElementById('pause-btn')!.innerText = this.pause ? 'ПРОДОЛЖИТЬ' : 'ПАУЗА';
        });
        this.createMap();

        const interval = setInterval(() => {
            if (!this.pause) {
                this.render!.renderMap(this.context!, this.mapData);
                this.render!.renderInfo(
                    (this.mapData.find(x => x.type === EntityType.Player) as Player).data, this.level,
                    this.mapData.filter(x => x.type === EntityType.Chest).length, this.mapData.filter(x => x.type === EntityType.Mob).length);
                this.mapWorker.go(this.mapData, this.lastKeyCode);
                this.lastKeyCode = '';

                if (this.mapWorker.gameOver) {
                    // this.changeMode!(GameModes.GAMEOVER);
                    // clearInterval(interval);
                }

                if (this.mapWorker.isNewLevel) {
                    this.mapWorker.isNewLevel = false;
                    this.level++;
                    this.context!.fillRect(0, 0, WIDTH, HEIGHT);
                    this.createMap();
                }
            }

        }, tick(FPS));
    }
}