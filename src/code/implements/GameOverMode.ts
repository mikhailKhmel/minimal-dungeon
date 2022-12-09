import {GameModes} from "../Constants";

export class GameOverMode {
    changeMode: Function | null = null;

    constructor(changeMode: Function) {
        this.changeMode = changeMode;
    }

    show(): void {
        document.getElementById('app')!.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="card text-white bg-danger mb-3" style="max-width: 20rem;">
                <div class="card-body">
                    <h4 class="card-title">КОНЕЦ ИГРЫ</h4>
                    <button id="btn-restart" class="btn btn-info">НАЧАТЬ ЗАНОВО</button>
                </div>
            </div>
        </div>`;
        document.getElementById('btn-restart')?.addEventListener('click', () => {
            this.changeMode!(GameModes.RUN);
        });
    }
}