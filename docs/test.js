const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

let scale = 1;
let draw  = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(-180, -180, 360, 360);
}

export const set_draw = f => draw = f;

function call_draw() {
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.scale(scale, scale);
    draw(ctx);
}

function on_resize() {
    scale = Math.min(360, window.innerWidth, window.innerHeight) / 360;    
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    call_draw();    
}
window.addEventListener('resize', on_resize);
window.addEventListener('load', on_resize);
