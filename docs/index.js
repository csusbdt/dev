import "./scripts/main.js";
import { frame  } from "./scripts/frame.js";
import { loop   } from "./scripts/loop.js";
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

const next   = loop(frame(i_next_0));
const source = loop(frame(i_source_0));
const auto   = loop(frame(i_auto_0));
const info   = loop(frame(i_info_0));
const back   = loop(frame(i_back_0));
const play   = loop(frame(i_play_0));
const clear  = loop(frame(i_clear_0));

const t_open   = touch().starts(thud);
const t_close  = touch().starts(thud);
const t_next   = touch(circle(199, 199, 66)).starts(blop);
const t_source = touch(circle(267,  82, 66)).starts(blop);
const t_auto   = touch(circle(332, 199, 66)).starts(blop);
const t_info   = touch(circle(267, 267, 66)).starts(blop);
const t_back   = touch(circle(132, 312, 66)).starts(blop);
const t_play   = touch(circle( 63, 199, 66)).starts(blop);
const t_clear  = touch(circle(125,  81, 66)).starts(blop);

const loops = [next, source, auto, info, back, play, clear];
const touches = [t_next, t_source, t_auto, t_info, t_back, t_play, t_clear, t_close];

t_open.starts(loops).starts(touches);
t_close.stops(loops).starts(t_open);
t_next.stops(loops).starts(t_open);
t_source.stops(loops).starts(t_open);
t_auto.stops(loops).starts(t_open);
t_info.stops(loops).starts(t_open);
t_back.stops(loops).starts(t_open);
t_play.stops(loops).starts(t_open);
t_clear.stops(loops).starts(t_open);

t_next.starts(_ => {
    if (++photo_index >= photos.length) photo_index = 0;
    localStorage.setItem("dev_photo_index", photo_index);
    document.body.style.backgroundImage = "url('" + photos[photo_index] + "')";
});

t_open.start();
