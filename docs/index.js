import "./scripts/main.js";
import { frame  } from "./scripts/frame.js";
import { loop   } from "./scripts/loop.js";
import { once   } from "./scripts/once.js";
import { touch  } from "./scripts/touch.js";
import { circle } from "./scripts/circle.js";
import { sfx    } from "./scripts/sfx.js";
import { music  } from "./scripts/music.js";

const photos = [
    "photos/palace_of_electricity.jpg",
    "photos/after_boston_fire_1872.jpg",
    "photos/maybe_san_francisco.jpg",
    "photos/san_francisco_cliff_house_1899.jpg",
    "photos/jama_masjid_delhi_india_late_1800s.jpg"
];

let photo_index = 0;
let photo_index_string = localStorage.getItem("dev_photo_index");
if (photo_index_string !== null) {
    photo_index = parseInt(photo_index_string);
}

document.body.style.backgroundImage = "url('" + photos[photo_index] + "')";

//document.body.style.backgroundColor = "rgb(175, 182, 44)";
//window.background_color = document.body.style.backgroundColor;

const thud = sfx("../sfx/thud_0.966.mp3", .5);
const blop = sfx("../sfx/blop_0.264.mp3", .5);

const next   = loop(frame(i_next_0  ));
const source = loop(frame(i_source_0));
const auto   = loop(frame(i_auto_0  ));
const info   = loop(frame(i_info_0  ));
const back   = loop(frame(i_back_0  ));
const play   = loop(frame(i_play_0  ));
const clear  = loop(frame(i_clear_0 ));

const d = 1 / 12;

const close_next_frames   = [frame(i_next_0  , d, 0, 0, 199, 199, 3/4)];
const close_source_frames = [frame(i_source_0, d, 0, 0, 267,  82, 3/4)];
const close_auto_frames   = [frame(i_auto_0  , d, 0, 0, 332, 199, 3/4)];
const close_info_frames   = [frame(i_info_0  , d, 0, 0, 267, 267, 3/4)];
const close_back_frames   = [frame(i_back_0  , d, 0, 0, 132, 312, 3/4)];
const close_play_frames   = [frame(i_play_0  , d, 0, 0,  63, 199, 3/4)];
const close_clear_frames  = [frame(i_clear_0 , d, 0, 0, 125,  81, 3/4)];

[
    close_next_frames  , 
    close_source_frames, 
    close_auto_frames  , 
    close_info_frames  , 
    close_back_frames  , 
    close_play_frames  , 
    close_clear_frames
].forEach(a => {
    a.push(a[0].copy_scaled(2/4));
    a.push(a[0].copy_scaled(1/4));
});

const open_next_frames   = close_next_frames  .slice().reverse();
const open_source_frames = close_source_frames.slice().reverse();
const open_auto_frames   = close_auto_frames  .slice().reverse();
const open_info_frames   = close_info_frames  .slice().reverse();
const open_back_frames   = close_back_frames  .slice().reverse();
const open_play_frames   = close_play_frames  .slice().reverse();
const open_clear_frames  = close_clear_frames .slice().reverse();

const close_next   = once(close_next_frames  );
const close_source = once(close_source_frames);
const close_auto   = once(close_auto_frames  );
const close_info   = once(close_info_frames  );
const close_back   = once(close_back_frames  );
const close_play   = once(close_play_frames  );
const close_clear  = once(close_clear_frames );

const open_next    = once(open_next_frames   );
const open_source  = once(open_source_frames );
const open_auto    = once(open_auto_frames   );
const open_info    = once(open_info_frames   );
const open_back    = once(open_back_frames   );
const open_play    = once(open_play_frames   );
const open_clear   = once(open_clear_frames  );

const delay_frames = [frame(null, d), frame(null, d), frame(null, d)];
const do_open      = once(delay_frames);
const do_close     = once(delay_frames);
const do_next      = once(delay_frames);
const do_source    = once(delay_frames);
const do_auto      = once(delay_frames);
const do_info      = once(delay_frames);
const do_back      = once(delay_frames);
const do_play      = once(delay_frames);
const do_clear     = once(delay_frames);

const t_open   = touch().starts(thud);
const t_close  = touch().starts(thud);
const t_next   = touch(circle(199, 199, 66)).starts(blop);
const t_source = touch(circle(267,  82, 66)).starts(blop);
const t_auto   = touch(circle(332, 199, 66)).starts(blop);
const t_info   = touch(circle(267, 267, 66)).starts(blop);
const t_back   = touch(circle(132, 312, 66)).starts(blop);
const t_play   = touch(circle( 63, 199, 66)).starts(blop);
const t_clear  = touch(circle(125,  81, 66)).starts(blop);

const open_loops   = [next, source, auto, info, back, play, clear];
const open_touches = [t_next, t_source, t_auto, t_info, t_back, t_play, t_clear, t_close];
const close_onces  = [close_next, close_source, close_auto, close_info, close_back, close_play, close_clear];
const open_onces   = [open_next , open_source , open_auto , open_info , open_back , open_play , open_clear ];

t_open                    .starts(do_open  , open_onces );
t_close .stops(open_loops).starts(do_close , close_onces);
t_next  .stops(open_loops).starts(do_next  , close_onces);
t_source.stops(open_loops).starts(do_source, close_onces);
t_auto  .stops(open_loops).starts(do_auto  , close_onces);
t_info  .stops(open_loops).starts(do_info  , close_onces);
t_back  .stops(open_loops).starts(do_back  , close_onces);
t_play  .stops(open_loops).starts(do_play  , close_onces);
t_clear .stops(open_loops).starts(do_clear , close_onces);

do_open.starts(open_loops, open_touches);

do_close.starts(t_open);

do_next.starts(t_open, _ => {
    if (++photo_index >= photos.length) photo_index = 0;
    localStorage.setItem("dev_photo_index", photo_index);
    document.body.style.backgroundImage = "url('" + photos[photo_index] + "')";
});

do_source.starts(t_open, _ => { });
do_auto  .starts(t_open, _ => { });
do_info  .starts(t_open, _ => { });
do_back  .starts(t_open, _ => { });
do_play  .starts(t_open, _ => { });
do_clear .starts(t_open, _ => { });

t_open.start();
