import { Render } from "./code/Render";
import {Game} from "./Game";

const render = new Render();
render.loadAssets()
.then(function () {
    const game = new Game(render);
    game.go();
});