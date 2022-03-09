import "./scripts/main.js";
import { background, image } from "./scripts/image.js";
import { circle    }         from "./scripts/circle.js";
import { rect      }         from "./scripts/rect.js";
import { touch     }         from "./scripts/touch.js";
//import { sfx       }         from "./scripts/sfx.js";
import { text      }         from "./scripts/text.js";

//const blop = sfx("../sfx/blop_0.264.mp3", .5);

const palace        = background(i_palace       );
const san_francisco = background(i_san_francisco);
const india         = background(i_india        );

const text_palace        = text("Paris, 1900"        , "36px serif", -200, -160);
const text_san_francisco = text("San Francisco, 1900", "18px serif", -80, -190);
const text_india         = text("Delhi, late 1800's" , "38px serif", -170, -290);

function rect_left(bg) {
    const w = bg.i.width;
    const h = bg.i.height;
    return rect(-w/3, 0, w/3, h);    
}

function rect_middle(bg) {
    const w = bg.i.width;
    const h = bg.i.height;
    return rect(0, 0, w/3, h);    
}

function rect_right(bg) {
    const w = bg.i.width;
    const h = bg.i.height;
    return rect(w/3, 0, w/3, h);    
}

const r_left_palace          = rect_left(palace);
const r_left_san_francisco   = rect_left(san_francisco);
const r_left_india           = rect_left(india);
const r_middle_palace        = rect_middle(palace);
const r_middle_san_francisco = rect_middle(san_francisco);
const r_middle_india         = rect_middle(india);
const r_right_palace         = rect_right(palace);
const r_right_san_francisco  = rect_right(san_francisco);
const r_right_india          = rect_right(india);

const t_left_palace          = touch(r_left_palace);
const t_left_san_francisco   = touch(r_left_san_francisco);
const t_left_india           = touch(r_left_india);
const t_middle_palace        = touch(r_middle_palace);
const t_middle_san_francisco = touch(r_middle_san_francisco);
const t_middle_india         = touch(r_middle_india);
const t_right_palace         = touch(r_right_palace);
const t_right_san_francisco  = touch(r_right_san_francisco);
const t_right_india          = touch(r_right_india);
const t_text_palace          = touch(r_middle_palace);
const t_text_san_francisco   = touch(r_middle_san_francisco);
const t_text_india           = touch(r_middle_india);

const touches_palace             = [t_left_palace, t_middle_palace, t_right_palace];
const touches_san_francisco      = [t_left_san_francisco, t_middle_san_francisco, t_right_san_francisco];
const touches_india              = [t_left_india, t_middle_india, t_right_india];
const touches_text_palace        = [t_left_palace, t_text_palace, t_right_palace];
const touches_text_san_francisco = [t_left_san_francisco, t_text_san_francisco, t_right_san_francisco];
const touches_text_india         = [t_left_india, t_text_india, t_right_india];

t_left_palace.stops(palace, text_palace);
t_left_san_francisco.stops(san_francisco, text_san_francisco);
t_left_india.stops(india, text_india);
//t_middle_palace
//t_middle_san_francisco
//t_middle_india
t_right_palace.stops(palace, text_palace);
t_right_san_francisco.stops(san_francisco, text_san_francisco);
t_right_india.stops(india, text_india);
t_text_palace.stops(text_palace);
t_text_san_francisco.stops(text_san_francisco);
t_text_india.stops(text_india);

t_left_palace.starts(india, touches_india);
t_left_san_francisco.starts(palace, touches_palace);
t_left_india.starts(san_francisco, touches_san_francisco);
t_middle_palace.starts(text_palace, touches_text_palace);
t_middle_san_francisco.starts(text_san_francisco, touches_text_san_francisco);
t_middle_india.starts(text_india, touches_text_india);
t_right_palace.starts(san_francisco, touches_san_francisco);
t_right_san_francisco.starts(india, touches_india);
t_right_india.starts(palace, touches_palace);
t_text_palace.starts(touches_palace);
t_text_san_francisco.starts(touches_san_francisco);
t_text_india.starts(touches_india);

palace.start();
start_start_sets(touches_palace);
