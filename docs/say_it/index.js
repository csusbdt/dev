import "../scripts/main.js";
import { sfx    } from "../scripts/sfx.js";
import { music  } from "../scripts/music.js";
import { touch  } from "../scripts/touch.js";
import { image  } from "../scripts/image.js";
import { frames } from "../scripts/frame.js" ;
import { circle } from "../scripts/circle.js";
import { once   } from "../scripts/once.js";
import { delay  } from "../scripts/delay.js";

function create_circle(i) {
    if (i.hx === undefined) {
        return circle(i.x, i.y, i.i.width * .45);    
    } else {
        return circle(i.hx, i.hy, i.i.width * .45).vert(i.vx, i.vy, i.i.width * .45);
    }
}

document.body.style.backgroundColor = "rgb(175, 182, 44)";

const thud = sfx("../sfx/thud_0.966.mp3", .5);
const blop = sfx("../sfx/blop_0.264.mp3", .5);

const say_it = music("say_it_isnt_so.mp3", .7);

const back   = image(i_back_0, -220, 0).vert(0, -200);
const play   = image(i_play_0,  120, 0).vert(0,  100);
const pause  = play.copy(i_pause_0);

const c_back  = create_circle(back);
const c_play  = create_circle(play);
const c_pause = create_circle(pause);

const t_bg_play  = touch(       ).starts(thud);
const t_bg_pause = touch(       ).starts(thud);
const t_back     = touch(c_back ).starts(blop);
const t_play     = touch(c_play ).starts(blop);
const t_pause    = touch(c_pause).starts(blop);

const view_play  = [back, play , t_bg_play , t_back, t_play ];
const view_pause = [back, pause, t_bg_pause, t_back, t_pause];

const close_back_frames  = frames([back .copy(i_back_1 ), back .copy(i_back_2 )]);
const close_play_frames  = frames([play .copy(i_play_1 ), play .copy(i_play_2 )]);
const close_pause_frames = frames([pause.copy(i_pause_1), pause.copy(i_pause_2)]);

const open_play_frames   = close_play_frames .slice().reverse();
const open_pause_frames  = close_pause_frames.slice().reverse();

const close_back  = once(close_back_frames );
const close_play  = once(close_play_frames );
const close_pause = once(close_pause_frames);

const open_play  = once(open_play_frames );
const open_pause = once(open_pause_frames);

const init = _ => {
    clear_drawables();
    clear_updatables();
    start_start_sets(view_play);
};
init();

t_bg_play .starts(view_play );
t_bg_pause.starts(view_pause);

t_back .stops(back ).starts(close_back );
t_play .stops(play ).starts(close_play );
t_pause.stops(pause).starts(close_pause);

t_play .starts(say_it);
t_pause.stops (say_it);

close_back.starts(delay(.5).starts(_ => { 
    setTimeout(init, 1000);
    window.location = '../'; 
}));

close_play.starts(open_pause);
close_pause.starts(open_play);

open_play.starts(view_play);
open_pause.starts(view_pause);
