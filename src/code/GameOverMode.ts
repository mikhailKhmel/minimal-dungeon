import {GameModes} from "./Constants";
import ls from "./localstorage";

export class GameOverMode {
    changeMode: Function | null = null;

    constructor(changeMode: Function) {
        this.changeMode = changeMode;
    }

    show(): void {
        const mobsWord = ls.killedMobs === 1 ? 'монстра' : 'монстров';
        document.getElementById('app')!.innerHTML = `
        <div class="d-flex justify-content-center mt-2">
            <div class="card text-white bg-danger mb-3" style="max-width: 20rem;">
                <div class="card-body">
                    <h4 class="card-title">КОНЕЦ ИГРЫ</h4>
                    <h6>Вы убили ${ls.killedMobs} ${mobsWord}</h6>
                    <button id="btn-restart" class="btn btn-info">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        </div>`;
        document.getElementById('btn-restart')?.addEventListener('click', () => {
            this.changeMode!(GameModes.RUN);
        });
    }
}