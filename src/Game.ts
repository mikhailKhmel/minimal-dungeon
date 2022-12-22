import { GameModes } from "./code/Constants";
import { StartMode } from "./code/StartMode";
import { RunMode } from "./code/RunMode";
import { GameOverMode } from "./code/GameOverMode";
import { Render } from "./code/Render";

export class Game {
    mode: GameModes = GameModes.START;
    render: Render | null = null;
    constructor(render: Render) {
        this.render = render;
    }

    public go() {
        switch (this.mode) {
            case GameModes.START: {
                const startMode = new StartMode(this.changeMode.bind(this));
                startMode.show();
                break;
            }
            case GameModes.RUN: {
                const runMode = new RunMode(this.changeMode.bind(this), this.render!);
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