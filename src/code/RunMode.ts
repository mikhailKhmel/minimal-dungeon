import { EntityType } from './enums/EntityType';
import { FPS, GameModes, HEIGHT, WIDTH } from './Constants';
import { EntitiesFiller } from './EntitiesFiller';
import { Player } from './implements/entities/Player';
import { IEntity } from './interfaces/IEntity';
import { MapGenerator } from './MapGenerator';
import { MapWorker } from './MapWorker';
import { Render } from './Render';
import { tick } from '../utils';
import { IPlayer } from './interfaces/IPlayer';
import ls from './LocalStorage';
import { EquipmentType } from './enums/EquipmentType';
import { ItemType } from './enums/ItemType';
import { IArmor } from './interfaces/IArmor';
import { IWeapon } from './interfaces/IWeapon';

export class RunMode {
  context: CanvasRenderingContext2D | null = null;
  entitiesGenerator: EntitiesFiller;
  mapGenerator: MapGenerator;
  render: Render | null = null;
  mapWorker: MapWorker;
  mapData: Array<IEntity> = [];
  lastKeyCode = '';
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
        <div>Версия: 0.0.3</div>
        <div id="item-info" class="card" style="position:absolute">
                                <div class="card-body">
                                    <h5 id="item-info-title" class="card-title"></h5>
                                    <h6 id="item-info-subtitle" class="card-subtitle mb-2 text-muted"></h6>
                                    <p id="item-info-text" class="card-text"></p>
                                </div>
                            </div>
        <div class="row">
            <div class="col-3">
                <div class="list-group">
                    <div class="list-group-item">Уровень этажа: <span id="level"></span>
                    </div>
                    <div class="list-group-item">Количество сундуков: <span id="chests"></span>
                    </div>
                    <div class="list-group-item">Количество мобов: <span id="mobs"></span>
                    </div>
                    <div class="list-group-item">Жизни: <span id="hp"></span>
                    </div>
                    <div class="list-group-item">Защита: <span id="armor"></span>
                    </div>
                    <div class="list-group-item">Сила: <span id="power"></span>
                    </div>
                </div>
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
                                            <img id="head-img" class=" img-thumbnail" />
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
                                            <img id="right-hand-img" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                    <div id="body" class="card">
                                        <div class="card-body btn">
                                            <img id="body-img" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-2">
                                    <div id="left-hand" class="card">
                                        <div class="card-body btn">
                                            <img id="left-hand-img" class=" img-thumbnail" />
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
                                            <img id="legs-img" class=" img-thumbnail" />
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
                            <h6>Инвентарь</h6>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-1" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-1" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-2" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-2" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div id="inv-3" class="col p-1">
                                    <div class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-3" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-4" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-4" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-5" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-5" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-6" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-6" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col p-1">
                                    <div id="inv-7" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-7" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-8" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-8" class=" img-thumbnail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col p-1">
                                    <div id="inv-9" class="card">
                                        <div class="card-body btn">
                                            <img id="inv-img-9" class=" img-thumbnail" />
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

  private _createMap() {
    this.mapData = this.entitiesGenerator.generate(this.mapGenerator.createMap(), ls.level);
  }

  private _applyItem(invIndex: number): void {
    let player = this.mapData.find((x) => x.type === EntityType.Player) as IPlayer;
    const inv = player.data.inventory;
    if (inv[invIndex]) {
      if (inv[invIndex].type === ItemType.Armor) {
        const item = inv[invIndex] as IArmor;
        const itemOnPlayer = player.data.equipment.find((x) => x.equipmentType === item.armorType);
        if (itemOnPlayer && itemOnPlayer.item) {
          return;
        }
      } else if (inv[invIndex].type === ItemType.Weapon) {
        const item = inv[invIndex] as IWeapon;
        const itemOnPlayer = player.data.equipment.find((x) => x.equipmentType === item.weaponType);
        if (itemOnPlayer && itemOnPlayer.item) {
          return;
        }
      }
      player = inv[invIndex].do(player);
      player.data.inventory = inv.filter((item) => item.id !== inv[invIndex].id);
    }
  }

  private _showItemInfo(invIndex: number, mouseX: number, mouseY: number, equipment = false): void {
    const player = this.mapData.find((x) => x.type === EntityType.Player) as IPlayer;
    const itemInfo = document.getElementById('item-info');
    const itemInfoTitle = document.getElementById('item-info-title');
    const itemInfoSubtitle = document.getElementById('item-info-subtitle');
    const itemInfoText = document.getElementById('item-info-text');
    let hasItem = false;
    if (itemInfoTitle && itemInfoText && itemInfoSubtitle) {
      if (!equipment) {
        const inv = player.data.inventory;
        if (inv[invIndex]) {
          hasItem = true;
          itemInfoTitle.innerText = inv[invIndex].title;
          itemInfoSubtitle.innerText = inv[invIndex].id;
          itemInfoText.innerText = inv[invIndex].info();
        }
      } else {
        const equipmentItem = player.data.equipment.find((x) => x.equipmentType === invIndex);
        if (equipmentItem && equipmentItem.item) {
          hasItem = true;
          itemInfoTitle.innerText = equipmentItem.item.title;
          itemInfoSubtitle.innerText = equipmentItem.item.id;
          itemInfoText.innerText = equipmentItem.item.info();
        }
      }
    }
    if (hasItem && itemInfo) {
      itemInfo.style['display'] = 'block';
      itemInfo.style['zIndex'] = '1000';
      itemInfo.style['left'] = mouseX.toString() + 'px';
      itemInfo.style['top'] = mouseY.toString() + 'px';
    }
  }

  private _clearItemInfo(): void {
    const itemInfo = document.getElementById('item-info');
    const itemInfoTitle = document.getElementById('item-info-title');
    const itemInfoSubtitle = document.getElementById('item-info-subtitle');
    const itemInfoText = document.getElementById('item-info-text');
    if (itemInfo && itemInfoTitle && itemInfoText && itemInfoSubtitle) {
      itemInfo.style['display'] = 'none';
      itemInfoTitle.innerText = '';
      itemInfoSubtitle.innerText = '';
      itemInfoText.innerText = '';
    }
  }

  private _unequipmentItem(equipmentType: EquipmentType) {
    let player = this.mapData.find((x) => x.type === EntityType.Player) as IPlayer;
    const equipmentItem = player.data.equipment.find((x) => x.equipmentType === equipmentType);
    if (equipmentItem && equipmentItem.item) {
      player = equipmentItem.item.undo(player);
    }
  }

  private _setEventListeners() {
    const inv1 = document.getElementById('inv-1');
    const inv2 = document.getElementById('inv-2');
    const inv3 = document.getElementById('inv-3');
    const inv4 = document.getElementById('inv-4');
    const inv5 = document.getElementById('inv-5');
    const inv6 = document.getElementById('inv-6');
    const inv7 = document.getElementById('inv-7');
    const inv8 = document.getElementById('inv-8');
    const inv9 = document.getElementById('inv-9');
    const pauseBtn = document.getElementById('pause-btn');
    const head = document.getElementById('head');
    const body = document.getElementById('body');
    const legs = document.getElementById('legs');
    const leftHand = document.getElementById('left-hand');
    const rightHand = document.getElementById('right-hand');

    if (
      !inv1 ||
      !inv2 ||
      !inv3 ||
      !inv4 ||
      !inv5 ||
      !inv6 ||
      !inv7 ||
      !inv8 ||
      !inv9 ||
      !pauseBtn ||
      !head ||
      !body ||
      !legs ||
      !leftHand ||
      !rightHand
    ) {
      throw new Error('Ошибка установки слушателей событий');
    }

    head.onclick = () => {
      this._unequipmentItem(EquipmentType.Head);
    };
    head.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(EquipmentType.Head, ev.clientX, ev.clientY, true);
    };
    head.onmouseleave = () => {
      this._clearItemInfo();
    };

    body.onclick = () => {
      this._unequipmentItem(EquipmentType.Body);
    };
    body.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(EquipmentType.Body, ev.clientX, ev.clientY, true);
    };
    body.onmouseleave = () => {
      this._clearItemInfo();
    };

    legs.onclick = () => {
      this._unequipmentItem(EquipmentType.Legs);
    };
    legs.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(EquipmentType.Legs, ev.clientX, ev.clientY, true);
    };
    legs.onmouseleave = () => {
      this._clearItemInfo();
    };

    rightHand.onclick = () => {
      this._unequipmentItem(EquipmentType.RightHand);
    };
    rightHand.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(EquipmentType.RightHand, ev.clientX, ev.clientY, true);
    };
    rightHand.onmouseleave = () => {
      this._clearItemInfo();
    };

    leftHand.onclick = () => {
      this._unequipmentItem(EquipmentType.LeftHand);
    };
    leftHand.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(EquipmentType.LeftHand, ev.clientX, ev.clientY, true);
    };
    leftHand.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv1.onclick = () => {
      this._applyItem(0);
    };
    inv1.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(0, ev.clientX, ev.clientY);
    };
    inv1.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv2.onclick = () => {
      this._applyItem(1);
    };
    inv2.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(1, ev.clientX, ev.clientY);
    };
    inv2.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv3.onclick = () => {
      this._applyItem(2);
    };
    inv3.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(2, ev.clientX, ev.clientY);
    };
    inv3.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv4.onclick = () => {
      this._applyItem(3);
    };
    inv4.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(3, ev.clientX, ev.clientY);
    };
    inv4.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv5.onclick = () => {
      this._applyItem(4);
    };
    inv5.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(4, ev.clientX, ev.clientY);
    };
    inv5.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv6.onclick = () => {
      this._applyItem(5);
    };
    inv6.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(5, ev.clientX, ev.clientY);
    };
    inv6.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv7.onclick = () => {
      this._applyItem(6);
    };
    inv7.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(6, ev.clientX, ev.clientY);
    };
    inv7.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv8.onclick = () => {
      this._applyItem(7);
    };
    inv8.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(7, ev.clientX, ev.clientY);
    };
    inv8.onmouseleave = () => {
      this._clearItemInfo();
    };

    inv9.onclick = () => {
      this._applyItem(8);
    };
    inv9.onmousemove = (ev: MouseEvent) => {
      this._showItemInfo(8, ev.clientX, ev.clientY);
    };
    inv9.onmouseleave = () => {
      this._clearItemInfo();
    };

    pauseBtn.onclick = () => {
      this.pause = !this.pause;
      const pauseBtn = document.getElementById('pause-btn');
      if (pauseBtn === null) return;
      pauseBtn.innerText = this.pause ? 'ПРОДОЛЖИТЬ' : 'ПАУЗА';
    };
  }

  public async go(): Promise<void> {
    this._setEventListeners();
    this._createMap();

    const interval = setInterval(() => {
      if (this.render === null || this.context === null || this.changeMode === null) {
        return;
      }
      if (!this.pause) {
        this.render?.renderMap(this.context, this.mapData);
        this.render?.renderInfo(
          this.mapData.find((x) => x.type === EntityType.Player) as Player,
          ls.level,
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
          ls.level++;
          this.context?.fillRect(0, 0, WIDTH, HEIGHT);
          this._createMap();
        }
      }
    }, tick(FPS));
  }
}
