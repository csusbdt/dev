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

const palace        = background(i_palace       );
const san_francisco = background(i_san_francisco);
const india         = background(i_india        );

function f(bg, left, right) {
    const w        = bg.i.width;
    const h        = bg.i.height;
    const r_left   = rect(-w/3, 0, w/3, h);
    const r_middle = rect(   0, 0, w/3, h);
    const r_right  = rect( w/3, 0, w/3, h);
    const t_left   = touch(r_left  ).stops(bg).starts(left);
    const t_middle = touch(r_middle).starts(blop);
    const t_right  = touch(r_right ).stops(bg).starts(right);
    const touches  = [t_left, t_middle, t_right];
    return touches;
}

const t_palace        = f(palace, india, san_francisco);
const t_san_francisco = f(san_francisco, palace, india);
const t_india         = f(india, san_francisco, palace);

t_palace       [1].starts(t_palace       );
t_san_francisco[1].starts(t_san_francisco);
t_india        [1].starts(t_india        );

t_palace       [2].starts(t_san_francisco);
t_san_francisco[2].starts(t_india        );
t_india        [2].starts(t_palace       );

t_palace       [0].starts(t_india        );
t_india        [0].starts(t_san_francisco);
t_san_francisco[0].starts(t_palace       );

palace.start();
start_start_sets(t_palace);
