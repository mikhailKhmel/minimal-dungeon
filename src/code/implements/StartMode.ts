import {GameModes} from "../Constants";

export class StartMode {
    changeMode: Function | null = null;

    constructor(changeMode: Function) {
        this.changeMode = changeMode;
    }

    show(): void {
        document.getElementById('app')!.innerHTML = `
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-auto mb-3">
                    <button id="start-btn" type="button" class="btn btn-primary btn-lg">СТАРТ</button>
                </div>
            </div>
        </div>`;
        document.getElementById('start-btn')?.addEventListener('click', () => {
            this.changeMode!(GameModes.RUN);
        });
    }
}