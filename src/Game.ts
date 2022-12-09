import { GameModes } from "./code/Constants";
import { StartMode } from "./code/implements/StartMode";
import { RunMode } from "./code/implements/RunMode";
import { GameOverMode } from "./code/implements/GameOverMode";

export class Game {
    mode: GameModes = GameModes.RUN;

    constructor() {

    }

    public go() {
        switch (this.mode) {
            case GameModes.START: {
                const startMode = new StartMode(this.changeMode.bind(this));
                startMode.show();
                break;
            }
            case GameModes.RUN: {
                const runMode = new RunMode(this.changeMode.bind(this));
                runMode.show()
                .then(() => {
                    runMode.go();
                });
                break;
            }
            case GameModes.GAMEOVER: {
                const gameOverMode = new GameOverMode(this.changeMode.bind(this));
                gameOverMode.show();
                break;
            }
        }
    }

    public changeMode(mode: GameModes) {
        this.mode = mode;
        this.go();
    }
}