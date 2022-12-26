import { EntityType } from './enums/EntityEnum';
import { FPS, GameModes, HEIGHT, WIDTH } from './Constants';
import { EntitiesFiller } from './EntitiesFiller';
import { Player } from './implements/entities/Player';
import { IEntity } from './interfaces/IEntity';
import { MapGenerator } from './MapGenerator';
import { MapWorker } from './MapWorker';
import { Render } from './Render';
import { tick } from '../utils';
import { IPlayer } from './interfaces/IPlayer';
import ls from './localstorage';

export class RunMode {
  context: CanvasRenderingContext2D | null = null;
  entitiesGenerator: EntitiesFiller;
  mapGenerator: MapGenerator;
  render: Render | null = null;
  mapWorker: MapWorker;
  mapData: Array<IEntity> = [];
  lastKeyCode = '';
  level = 1;
  changeMode: ((mode: GameModes) => void) | null = null;
  pause = false;

  constructor(changeMode: (mode: GameModes) => void, render: Render) {
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
    const app = document.getElementById('app');
    if (app === null) {
      return;
    }
    app.innerHTML =
      `
        <div class="container-xl mt-2">
        <div>Версия: 0.0.2</div>
        <div class="row">
            <div class="col-3">
                <ul class="list-group">
                    <li class="list-group-item">Уровень этажа: <p id="level"></p>
                    </li>
                    <li class="list-group-item">Количество сундуков: <p id="chests"></p>
                    </li>
                    <li class="list-group-item">Количество мобов: <p id="mobs"></p>
                    </li>
                    <li class="list-group-item">Жизни: <p id="hp"></p>
                    </li>
                    <li class="list-group-item">Защита: <p id="armor"></p>
                    </li>
                    <li class="list-group-item">Сила: <p id="power"></p>
                    </li>
                </ul>
            </div>
            <div class="col-6">
                <canvas id="game"></canvas>
            </div>
            <div class="col-3">
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
                        <div class="container text-center">
                            <h6>Игрок</h6>
                            <div class="row gx-5">
                                <div class="col p-2">
                                </div>
                                <div class="col p-2">
                                    <div id="head" class="card">
                                        <div class="card-body btn">
                                            <img id="head-img" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-2">
                                    <div id="right-hand" class="card">
                                        <div class="card-body btn">
                                            <img id="right-hand-img" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                    <div id="body" class="card">
                                        <div class="card-body btn">
                                            <img id="body-img" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                    <div id="left-hand" class="card">
                                        <div class="card-body btn">
                                            <img id="left-hand-img" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-2">
                                </div>
                                <div class="col p-2">
                                    <div id="legs" class="card">
                                        <div class="card-body btn">
                                            <img id="legs-img" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5">
                        <div id="inventory" class="container text-center p-2">
                            <h6>Инвантарь</h6>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-1" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-1" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-2" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-2" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div id="inv-3" class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-3" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-4" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-4" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-5" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-5" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-6" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-6" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-7" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-7" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-8" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-8" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-9" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-9" class="rounded mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        ` ?? '';
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
    let player = this.mapData.find((x) => x.type === EntityType.Player) as IPlayer;
    const inv = player.data.inventory;
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
      const pauseBtn = document.getElementById('pause-btn');
      if (pauseBtn === null) return;
      pauseBtn.innerText = this.pause ? 'ПРОДОЛЖИТЬ' : 'ПАУЗА';
    });
    this.createMap();

    const interval = setInterval(() => {
      if (this.render === null || this.context === null || this.changeMode === null) {
        return;
      }
      if (!this.pause) {
        this.render?.renderMap(this.context, this.mapData);
        this.render?.renderInfo(
          (this.mapData.find((x) => x.type === EntityType.Player) as Player).data,
          this.level,
          this.mapData.filter((x) => x.type === EntityType.Chest).length,
          this.mapData.filter((x) => x.type === EntityType.Mob).length,
        );
        this.mapWorker.go(this.mapData, this.lastKeyCode);
        this.lastKeyCode = '';

        if (this.mapWorker.gameOver) {
          this.changeMode(GameModes.GAMEOVER);
          clearInterval(interval);
        }

        if (this.mapWorker.isNewLevel) {
          this.mapWorker.isNewLevel = false;
          this.level++;
          this.context?.fillRect(0, 0, WIDTH, HEIGHT);
          this.createMap();
        }
      }
    }, tick(FPS));
  }
}
