import "./scripts/main.js";
import { frame  } from "./scripts/frame.js";
import { loop   } from "./scripts/loop.js";
import { touch  } from "./scripts/touch.js";
import { circle } from "./scripts/circle.js";
import { sfx    } from "./scripts/sfx.js";
import { music  } from "./scripts/music.js";

const s = document.body.style;

s.backgroundImage = "url('photos/palace_of_electricity.jpg')";


//document.body.style.backgroundColor = "rgb(175, 182, 44)";
//window.background_color = document.body.style.backgroundColor;

const thud = sfx("../sfx/thud_0.966.mp3", .5);
const blop = sfx("../sfx/blop_0.264.mp3", .5);

const t_thud = touch().starts(thud);

t_thud.starts(t_thud);

const next = loop(frame(i_next_0));
const clear = loop(frame(i_clear_0));

t_thud.start();
next.start();
clear.start();
