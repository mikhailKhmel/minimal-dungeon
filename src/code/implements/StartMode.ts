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
            <div class="col-auto mb-3 text-center" style="width: 25rem;">
                <button id="start-btn" type="button" class="btn btn-warning btn-lg">СТАРТ</button>
                <p class="text-center text-wrap">
                    <h3>Управление:</h3>
                    <ul class="list-group">
                        <li class="list-group-item">W - вверх;</li>
                        <li class="list-group-item">A - влево;</li>
                        <li class="list-group-item">S - вниз;</li>
                        <li class="list-group-item">D - вправо;</li>
                        <li class="list-group-item">Space - атака или взаимолдействие с предметами</li>
                        <li class="list-group-item">Клик мышью по предметам инвентаря - применить предмет</li>
                    </ul>
                </p>
            </div>
        </div>
    </div>`;
        document.getElementById('start-btn')?.addEventListener('click', () => {
            this.changeMode!(GameModes.RUN);
        });
    }
}