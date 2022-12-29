import { GameModes } from './Constants';
import ls from './LocalStorage';

export class GameOverMode {
  changeMode: ((mode: GameModes) => void) | null = null;

  constructor(changeMode: (mode: GameModes) => void) {
    this.changeMode = changeMode;
  }

  show(): void {
    const mobsWord = ls.killedMobs === 1 ? 'монстра' : 'монстров';
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
        <div class="d-flex justify-content-center mt-2">
            <div class="card text-white bg-danger mb-3" style="max-width: 20rem;">
                <div class="card-body">
                    <h4 class="card-title">КОНЕЦ ИГРЫ</h4>
                    <h6>Вы убили ${ls.killedMobs} ${mobsWord}</h6>
                    <button id="btn-restart" class="btn btn-warning">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        </div>`;
    document.getElementById('btn-restart')?.addEventListener('click', () => {
      if (!this.changeMode) return;
      this.changeMode(GameModes.RUN);
    });
  }
}
