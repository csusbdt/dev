import "../scripts/main.js";
import { background, image } from "../scripts/image.js";
import { circle     }         from "../scripts/circle.js";
import { rect       }         from "../scripts/rect.js";
import { touch      }         from "../scripts/touch.js";
import { text       }         from "../scripts/text.js";
import { sfx        }         from "../scripts/sfx.js";
import { once       }         from "../scripts/once.js";
import { delay      }         from "../scripts/delay.js";
import { get_state  }         from "../scripts/state.js";

const state = get_state("photos", { version: '0' });

//state.init("photos", { version: '0' });

const blop = sfx("../sfx/blop_0.264.mp3", .5);

const palace        = background(i_palace       );
const san_francisco = background(i_san_francisco);
const india         = background(i_india        );

palace       .starts(state.set.bind(state, "src", i_palace.src       ));
san_francisco.starts(state.set.bind(state, "src", i_san_francisco.src));
india        .starts(state.set.bind(state, "src", i_india.src        ));

const text_palace        = text("Paris, 1900"        , "36px serif", -200, -160);
const text_san_francisco = text("San Francisco, 1900", "18px serif", -80, -190);
const text_india         = text("Delhi, late 1800's" , "38px serif", -170, -290);

const c_palace_0 = circle(0, 0, 50, 10);
const c_palace_1 = circle(0, 0, 25, 10);
const c_palace_2 = circle(0, 0, 10, 10);
const c_san_francisco_0 = circle(0, 0, 30, 10);
const c_san_francisco_1 = circle(0, 0, 15, 10);
const c_san_francisco_2 = circle(0, 0, 5, 10);
const c_india_0 = circle(0, 0, 70, 10);
const c_india_1 = circle(0, 0, 35, 10);
const c_india_2 = circle(0, 0, 15, 10);

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

const t_back_palace          = touch(c_palace_0);
const t_back_san_francisco   = touch(c_san_francisco_0);
const t_back_india           = touch(c_india_0);

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

const close_back_palace        = once([c_palace_1, c_palace_2]);
const close_back_san_francisco = once([c_san_francisco_1, c_san_francisco_2]);
const close_back_india         = once([c_india_1, c_india_2]);

const touches_palace             = [t_left_palace, t_middle_palace, t_right_palace];
const touches_san_francisco      = [t_left_san_francisco, t_middle_san_francisco, t_right_san_francisco];
const touches_india              = [t_left_india, t_middle_india, t_right_india];
const touches_text_palace        = [t_back_palace, t_left_palace, t_text_palace, t_right_palace];
const touches_text_san_francisco = [t_back_san_francisco, t_left_san_francisco, t_text_san_francisco, t_right_san_francisco];
const touches_text_india         = [t_back_india, t_left_india, t_text_india, t_right_india];

t_left_palace.stops(palace, c_palace_0, text_palace);
t_left_san_francisco.stops(san_francisco, c_san_francisco_0, text_san_francisco);
t_left_india.stops(india, c_india_0, text_india);
//t_middle_palace
//t_middle_san_francisco
//t_middle_india
t_right_palace.stops(palace, c_palace_0, text_palace);
t_right_san_francisco.stops(san_francisco, c_san_francisco_0, text_san_francisco);
t_right_india.stops(india, c_india_0, text_india);

t_back_palace.stops(c_palace_0);
t_back_san_francisco.stops(c_san_francisco_0);
t_back_india.stops(c_india_0);

t_text_palace.stops(c_palace_0, text_palace);
t_text_san_francisco.stops(c_san_francisco_0, text_san_francisco);
t_text_india.stops(c_india_0, text_india);

t_back_palace.starts(blop, close_back_palace);
t_back_san_francisco.starts(blop, close_back_san_francisco);
t_back_india.starts(blop, close_back_india);

t_left_palace.starts(india, touches_india);
t_left_san_francisco.starts(palace, touches_palace);
t_left_india.starts(san_francisco, touches_san_francisco);
t_middle_palace.starts(c_palace_0, text_palace, touches_text_palace);
t_middle_san_francisco.starts(c_san_francisco_0, text_san_francisco, touches_text_san_francisco);
t_middle_india.starts(c_india_0, text_india, touches_text_india);
t_right_palace.starts(san_francisco, touches_san_francisco);
t_right_san_francisco.starts(india, touches_india);
t_right_india.starts(palace, touches_palace);
t_text_palace.starts(touches_palace);
t_text_san_francisco.starts(touches_san_francisco);
t_text_india.starts(touches_india);

close_back_palace.starts(delay(.5).starts(_ => { 
    setTimeout(_ => {
        text_palace.stop();
        start_start_sets(touches_palace);
    }, 500);
    window.location = '../'; 
}));

close_back_san_francisco.starts(delay(.5).starts(_ => { 
    setTimeout(_ => {
        text_san_francisco.stop();
        start_start_sets(touches_san_francisco);
    }, 500);
    window.location = '../'; 
}));

close_back_india.starts(delay(.5).starts(_ => { 
    setTimeout(_ => {
        text_india.stop();
        start_start_sets(touches_india);
    }, 500);
    window.location = '../'; 
}));

if (state.get("src") === i_san_francisco.src) {
    san_francisco.start();
    start_start_sets(touches_san_francisco);
} else if (state.get("src") === i_india.src) {
    india.start();
    start_start_sets(touches_india);
} else {
    palace.start();
    start_start_sets(touches_palace);    
}
