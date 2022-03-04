import "./scripts/main.js";
import { background, image } from "./scripts/image.js";
import { circle    }         from "./scripts/circle.js";
import { rect      }         from "./scripts/rect.js";

// test
//center_canvas();
//canvas.width = 645;
//canvas.height = 460;
//window.dw = 645;
//window.dh = 460;
//const bg = image(i_palace_of_electricity).start();

//image(i_palace_of_electricity,  0, 20, 1, .2).start();
//image(i_palace_of_electricity, 40, 0, 2, .2).start();
//circle(200, -104, 110, 10).start();
//circle(  0,    0, 140, 10).start();

fill_window();
const bg = background(i_palace_of_electricity).start();


const w = bg.i.width;
const h = bg.i.height;

rect(-w/3, 0, w/3, h).start();
rect(   0, 0, w/3, h).start();
rect( w/3, 0, w/3, h).start();

//rect(   0, 0, w/3, h).vert(0, 0, w, h/3).start();

