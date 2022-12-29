import { GameModes } from './Constants';

export class StartMode {
  changeMode: ((mode: GameModes) => void) | null = null;

  constructor(changeMode: (mode: GameModes) => void) {
    this.changeMode = changeMode;
  }

  show(): void {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
      loadingSpinner.innerHTML = '';
    }
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
        <div class="container mt-2">
        <div class="row justify-content-center align-items-center">
            <div class="col-auto mb-3 text-center" style="width: 25rem;">
                <h1>Minimal Dungeon</h1>
                <p class="text-center text-wrap">
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="card-title">
                            <h3>Цель игры: </h3>
                        </div>
                        <div class="card-text">
                            <p>Убивай монстров, собирай сокровища, переходи на новые уровни.
                            <p>Чем выше уровень, тем сильнее монстры.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h3>Управление:</h3>
                        </div>
                        <div class="card-text">
                            <ul class="list-group">
                                <li class="list-group-item">W - вверх;</li>
                                <li class="list-group-item">A - влево;</li>
                                <li class="list-group-item">S - вниз;</li>
                                <li class="list-group-item">D - вправо;</li>
                                <li class="list-group-item">E - атака или взаимодействие с окружением</li>
                                <li class="list-group-item">ЛКМ по предметам инвентаря - применить/надеть предмет/экипировку</li>
                                <li class="list-group-item">ЛКМ по предметам экипировки - снять предмет экипировки</li>
                                <li class="list-group-item">ПКМ по предметам инвентаря - удалить предмет/экипировку</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </p>
                <button id="start-btn" type="button" class="btn btn-warning btn-lg">СТАРТ</button>
            </div>
        </div>
    </div>`;
    document.getElementById('start-btn')?.addEventListener('click', () => {
      if (!this.changeMode) return;
      this.changeMode(GameModes.RUN);
    });
  }
}
