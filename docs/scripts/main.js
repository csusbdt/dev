///////////////////////////////////////////////////////////
//                         logging                       //
///////////////////////////////////////////////////////////

window.log = function(...args) {
	let msg = "";
	args.forEach(arg => {
		if (arg instanceof Error) {
			msg += arg.toString();
		} else if (arg instanceof Event) {
			msg += 'Event.type = ' + arg.type;
		} else {
			msg += arg
		}
		msg += '\n';
	});
	console.log(msg)
	const div = document.createElement('div');
	div.style.whiteSpace = 'pre';
    div.style.zIndex = 1000;
    div.style.position = "absolute";
    div.style.top = "20";
    div.style.left = "20";
	div.innerHTML = msg;
	div.style.fontSize = '4em';
	document.body.appendChild(div);
};

window.addEventListener('unhandledrejection', function(e) {
 	if (typeof(e.reason.stack) !== 'undefined') {
		log(e.reason, e.reason.message, e.reason.stack);
	} else {
		log(e.reason, e.reason.message);
	}
});

///////////////////////////////////////////////////////////////
//                           canvas                          //
///////////////////////////////////////////////////////////////

window.canvas = document.createElement("canvas");
canvas.style.zIndex   = 0;
canvas.style.position = "absolute";
canvas.style.top      = 0;
canvas.style.left     = 0;
canvas.style.padding  = 0;
canvas.style.margin   = 0;
document.body.appendChild(canvas);

window.dw    = null; // design width, null means no scaling
window.dh    = null; // design height
window.dirty = true; // to redraw canvas

window.set_design = (w, h) => {
    dw    = w;
    dh    = h;
    dirty = true;
};

window.scale = _ => {
    if (dw === null) {
        return 1;
    } else {
        return Math.min(canvas.width / dw, canvas.height / dh);
    }
}

function on_resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    dirty = true;
}
addEventListener('resize', on_resize, { capture: false             });
addEventListener('load'  , on_resize, { capture: false, once: true });

// alpha === false speeds up drawing of transparent images
const ctx = canvas.getContext('2d', { alpha: true });

///////////////////////////////////////////////////////////////
//                           touch                           //
///////////////////////////////////////////////////////////////

window.audio_context = null;
window.touchables    = [];

window.add_touchable = function(o) {
	if (!('z' in o)) {
		throw new Error("z missing fram touchable");
	}
	if (touchables.includes(o)) return;
	for (let i = 0; i < touchables.length; ++i) {
		if (o.z < touchables[i].z) {
			touchables.splice(i, 0, o);
			return;
		}
	}
	touchables.push(o);
};

window.remove_touchable = function(o) {
	const i = touchables.indexOf(o);
	if (i !== -1) {
		touchables.splice(i, 1);
	}
};

window.clear_touchables = function() {
 	touchables.length = 0;
};

const page_touch = (page_x, page_y) => {    
	if (audio_context === null) {
		audio_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	if (audio_context.state === 'suspended') { // not sure this is needed
		audio_context.resume();
	}
    const s = scale();
	const x = (page_x - canvas.width  / 2) / s;
	const y = (page_y - canvas.height / 2) / s;
	for (let i = 0; i < touchables.length; ++i) {
		if (touchables[i].touch(x, y)) break;
	}
};

const mousemove = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	canvas.style.cursor = 'default';
};

const mousedown = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	canvas.style.cursor = 'default';
	page_touch(e.pageX, e.pageY);
};

// the following touchend and touchmove code needed for fullscreen on chrome
// see: https://stackoverflow.com/questions/42945378/full-screen-event-on-touch-not-working-on-chrome/42948120

const touchend = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	canvas.style.cursor = 'none';
	page_touch(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
};

const touchmove = e => {
	e.preventDefault();
};

document.addEventListener('mousemove', mousemove, true);
document.addEventListener('mousedown', mousedown, true); 
document.addEventListener('touchend' , touchend , true); 
document.addEventListener('touchmove', touchmove, { passive: false }); 

///////////////////////////////////////////////////////////
//                       animation                       //
///////////////////////////////////////////////////////////

window.drawables  = [];
window.updatables = [];

let previous_time = new Date().getTime() / 1000;

function animation_loop() {
	const current_time = new Date().getTime() / 1000;
	if (dirty) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);	
		ctx.clearRect(0, 0, canvas.width, canvas.height);	

        const ds = scale();
        ctx.scale(ds, ds);
        ctx.translate(canvas.width/ds/2, canvas.height/ds/2);

        drawables.forEach(o => o.draw(ctx));
		dirty = false;
	}
	let dt = current_time - previous_time;
	updatables.slice().forEach(o => o.update(dt));
	previous_time = current_time;
	requestAnimationFrame(animation_loop);
}

addEventListener('load', _ => {
	requestAnimationFrame(animation_loop);
}, { once: true });

window.add_drawable = function(o) {
	if (!('z' in o)) {
		throw new Error("z missing fram drawable");
	}
	if (!drawables.includes(o)) {
		dirty = true;
		for (let i = drawables.length; i > 0; --i) {
			if (o.z >= drawables[i - 1].z) {
				drawables.splice(i, 0, o);
				return;
			}
		}
		drawables.unshift(o);
	}
};

window.remove_drawable = function(o) {
	const i = drawables.indexOf(o);
	if (i !== -1) {
		drawables.splice(i, 1);
		dirty = true;
	}
};

window.clear_drawables = function() {
 	drawables.length = 0;
 	dirty = true;
};

window.add_updatable = function(o) {
	if (!updatables.includes(o)) {
		updatables.push(o);
	}
};

window.remove_updatable = function(o) {
	const i = updatables.indexOf(o);
	if (i !== -1) {
		updatables.splice(i, 1);
	}
};

window.clear_updatables = function() {
 	updatables.length = 0;
};

///////////////////////////////////////////////////////////
//                        mixins                         //
///////////////////////////////////////////////////////////

window.mixin = {};

window.horizontal = function() {
	return innerWidth >= innerHeight;
}

window.vertical = function() {
	return innerWidth < innerHeight;
}

window.mixin.vert = function(x, y) {
	if (y === undefined) {
		this.hx = x.hx;
		this.hy = x.hy;
		this.vx = x.vx;
		this.vy = x.vy;
	} else {
		this.vx = x;
		this.vy = y;
		this.hx = this.x;
		this.hy = this.y;
	}
	return this;
}

window.mixin.check_vert = function() {
	if (this.vx !== undefined) {
		if (vertical()) {
			this.x = this.vx;
			this.y = this.vy;
		} else {
			this.x = this.hx;
			this.y = this.hy;
		}
	}
}

window.mixin.starts = function(...os) {
	os.forEach(o => {
		if (Array.isArray(o)) {
			o.forEach(oo => {
				this.starts(oo);
			});
		} else {
			this.start_set.push(o);
		}
	});
	return this;
};

window.start_start_sets = function(...start_sets) {
	start_sets.forEach(start_set => {
		start_set.forEach(o => {
			if (typeof(o) === 'function') {
				o();
			} else {
				o.start();
			}
		});
	});
};

window.mixin.stops = function(...os) {
	os.forEach(o => {
		if (Array.isArray(o)) {
			o.forEach(oo => {
				this.stops(oo);
			});
		} else {
			this.stop_set.push(o);
		}
	});
	return this;
};

window.stop_stop_sets = function(...stop_sets) {
	stop_sets.forEach(stop_set => {
		stop_set.forEach(o => o.stop())
	});
};
