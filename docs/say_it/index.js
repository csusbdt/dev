import "../scripts/main.js";
import { sfx        }         from "../scripts/sfx.js";
import { music      }         from "../scripts/music.js";
import { touch      }         from "../scripts/touch.js";

import { image      }         from "../scripts/image.js";

import { frames, frame } from "../scripts/frame.js" ;
import { circle     }         from "../scripts/circle.js";
import { loop       }         from "../scripts/loop.js";
import { once       }         from "../scripts/once.js";
import { delay          }         from "../scripts/delay.js";

const thud = sfx("../sfx/thud_0.966.mp3", .5);
const blop = sfx("../sfx/blop_0.264.mp3", .5);

const say_it = music("say_it_isnt_so.mp3", .7);

document.body.style.backgroundColor = "rgb(175, 182, 44)";

const back   = image(i_back_0, -220, 0).vert(0, -200);

const c_back = circle(back.hx, back.hy, back.i.width * .45).vert(back.vx, back.vy, back.i.width * .45);

const t_bg_play = touch(      ).starts(thud);
const t_back    = touch(c_back).starts(blop);

const view_play = [back, t_bg_play, t_back];

const close_back_frames = frames([back.copy(i_back_1), back.copy(i_back_2)]);

const close_back = once(close_back_frames);

const init = _ => {
    clear_drawables();
    clear_updatables();
//    clear_touchables();
    start_start_sets(view_play);
};
init();

t_bg_play.starts(view_play);
t_back.stops(back).starts(close_back);

//const play_view  = [back, play, t_play];
//const pause_view = [back_touch, pause, pause_touch, pause_bg_touch];

//back_closing.starts(delay(.5).starts(_ => { 
close_back.starts(delay(.5).starts(_ => { 
    setTimeout(init, 1000);
    window.location = '../'; 
}));


/*
const play  = image(i_play_0, 120, 0).vert(0, 100);
const pause = image(i_pause_0, 120, 0).vert(0, 100);
//back.start();
//play.start();

const close_play_frames = frames([i_play_1, i_play_2]);
const close_play        = once(close_play_frames, 120, 0).vert(0, 100);

const c_back = circle(back.hx, back.hy, back.i.width).vert(back.vx, back.vy, back.i.width);
const c_play = circle(play.hx, play.hy, play.i.width).vert(play.vx, play.vy, play.i.width);

const t_play = touch(c_play).starts(blop);

t_play.stops(play);
t_play.starts(close_play);
*/




//close_play.starts(pause);


//const back_frames  = frames([i_back_0 ]);

//const play_frames  = frames([i_play_0 ]);
//const pause_frames = frames([i_pause_0]);

//const back_closing_frames  = frames([i_back_1 , i_back_2 ], .08);
//const play_closing_frames  = frames([i_play_1 , i_play_2 ], .08);
//const pause_closing_frames = frames([i_pause_1, i_pause_2], .08);

//const play_opening_frames  = play_closing_frames.slice().reverse();
//const pause_opening_frames = pause_closing_frames.slice().reverse();

//const back   = loop(back_frames , 10).vert(270, 180);
//const play   = loop(play_frames , 10).vert(-270, 340);
//const pause  = loop(pause_frames, 10).vert(-270, 340);

//const back_closing  = once(back_closing_frames , 10).vert(270, 180);
//const play_closing  = once(play_closing_frames , 10).vert(-270, 340);
//const pause_closing = once(pause_closing_frames, 10).vert(-270, 340);

//const play_opening  = once(play_opening_frames , 10).vert(-270, 340);
//const pause_opening = once(pause_opening_frames, 10).vert(-270, 340);

//const back_touch      = touch(circle( 70,  70,  53)).vert(270, 180);
//const play_touch      = touch(circle(608, 327, 110)).vert(-270, 340);

//const pause_touch     = touch(circle(620, 316, 126)).vert(-270, 340);
//const pause_bg_touch  = touch();

/*
back_touch.stops(back).starts(blop, back_closing);
play_touch.stops(play).starts(blop, play_closing, say_it);
back_closing.starts(delay(.5).starts(_ => { 
    setTimeout(init, 500);
    window.location = '../'; 
}));
play_closing.starts(pause_opening);
pause_opening.starts(pause_view);

pause_touch.stops(say_it, pause).starts(blop, pause_closing);
pause_closing.starts(play_opening);
play_opening.starts(play_view);

play_bg_touch.starts(thud, play_view);
pause_bg_touch.starts(thud, pause_view);

say_it.stops(pause_view).starts(pause_closing);

window.on_vertical = _ => {
    set_design_size(720, 1280);
};

window.on_horizontal = _ => {
    set_design_size(1280, 720);
};

back.start();
*/
