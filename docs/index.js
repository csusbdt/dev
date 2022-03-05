import "./scripts/main.js";
import { background, image } from "./scripts/image.js";
import { circle    }         from "./scripts/circle.js";
import { rect      }         from "./scripts/rect.js";
import { touch     }         from "./scripts/touch.js";
import { sfx       }         from "./scripts/sfx.js";

const blop = sfx("../sfx/blop_0.264.mp3", .5);

// test
//const bg = image(i_palace_of_electricity).start();
//set_design(bg.i.width, bg.i.height);
const bg = background(i_palace_of_electricity).start();

const w = bg.i.width;
const h = bg.i.height;
const r_left   = rect(-w/3, 0, w/3, h).start();
const r_middle = rect(   0, 0, w/3, h).start();
const r_right  = rect( w/3, 0, w/3, h).start();
// test
//rect(   0, 0, w/3, h).vert(0, 0, w, h/3).start();

const t_middle = touch(r_middle).starts(blop);

const touches = [t_middle];

t_middle.starts(touches);

start_start_sets(touches);

