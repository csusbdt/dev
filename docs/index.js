import "./scripts/main.js";
import { bg, image } from "./scripts/image.js";
import { circle    } from "./scripts/circle.js";

bg(i_palace_of_electricity).start();
image(i_palace_of_electricity,  0, 20, 1, .2).start();
image(i_palace_of_electricity, 40, 0, 2, .2).start();

//window.dw = 645;
//window.dh = 460;

//circle(228, -140, 60, 0, 645, 460).start();

function adjust_canvas() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;
    dirty = true;    
}
addEventListener('resize', adjust_canvas);
addEventListener('load'  , adjust_canvas);
