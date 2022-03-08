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

const text_palace        = text("Paris, 1900"        , "36px serif", 0, 0);
const text_san_francisco = text("San Fransisco, 1900", "36px serif", 0, 0);
const text_india         = text("Delhi, late 1800's" , "36px serif", 0, 0);

function rect_left(bg) {
    const w        = bg.i.width;
    const h        = bg.i.height;
    return rect(-w/3, 0, w/3, h);    
}

function rect_middle(bg) {
    const w        = bg.i.width;
    const h        = bg.i.height;
    return rect(0, 0, w/3, h);    
}

function rect_right(bg) {
    const w        = bg.i.width;
    const h        = bg.i.height;
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

t_left_palace.stops(text_palace);
t_left_san_francisco.stops(text_san_francisco);
t_left_india.stops(text_india);
//t_middle_palace
//t_middle_san_francisco
//t_middle_india
t_right_palace.stops(text_palace);
t_right_san_francisco.stops(text_san_francisco);
t_right_india.stops(text_india);
t_text_palace.stops(text_palace);
t_text_san_francisco.stops(text_san_francisco);
t_text_india.stops(text_india);

t_left_palace.starts();
t_left_san_francisco
t_left_india
t_middle_palace
t_middle_san_francisco
t_middle_india
t_right_palace
t_right_san_francisco
t_right_india
t_text_palace
t_text_san_francisco
t_text_india





const t_text_palace..stops(palace_text).starts(t_palace);

t_palace       [1].starts(palace_text, t_palace_text  );
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

//t_palace[1].starts(palace_text, t_palace_text);
