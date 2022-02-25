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

///////////////////////////////////////////////////////////
//                         touch                         //
///////////////////////////////////////////////////////////

window.audio_context = null;
window.page_touch    = null;

const on_touch = (x, y) => {
	if (audio_context === null) {
		audio_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	if (audio_context.state === 'suspended') { // not sure this is needed
		audio_context.resume();
	}
	if (page_touch !== null) page_touch(x, y);
};

const mousemove = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	a_canvas.style.cursor = 'default';
};

const mousedown = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	a_canvas.style.cursor = 'default';
//	on_touch(design_coords(e));
	on_touch(e.pageX, e.pageY);
};

// the following touchend and touchmove code needed for fullscreen on chrome
// see: https://stackoverflow.com/questions/42945378/full-screen-event-on-touch-not-working-on-chrome/42948120

const touchend = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	a_canvas.style.cursor = 'none';
//	on_touch(design_coords(e.changedTouches[0]));
	on_touch(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
};

const touchmove = e => {
	e.preventDefault();
};

document.addEventListener('mousemove', mousemove, true);
document.addEventListener('mousedown', mousedown, true); 
document.addEventListener('touchend' , touchend , true); 
document.addEventListener('touchmove', touchmove, { passive: false }); 

///////////////////////////////////////////////////////////
//                         canvas                        //
///////////////////////////////////////////////////////////

window.dirty      = true;  // to redraw canvas

let design_width  = 400;
let design_height = 400;

window.set_design_size = function(w, h) {
 	design_width = w;
 	design_height = h;
}

// alpha === false speeds up drawing of transparent images
const ctx = a_canvas.getContext('2d', { alpha: true });

let scale      = 1;
let left       = 0;
let top        = 0;

function adjust_canvas() {
	let w = window.innerWidth;
	let h = window.innerHeight;
	
	scale = Math.min(1, w / design_width, h / design_height);
	a_canvas.width  = scale * design_width;
	a_canvas.height = scale * design_height;

	// Center canvas in browser window.
	left = (w  - a_canvas.width ) / 2;
	top  = (h - a_canvas.height)  / 2;
	a_canvas.style.left = left;
	a_canvas.style.top  = top;

	// Set drawing context transform to scale 
    // design coordinates to display coordinates.
	ctx.setTransform(scale, 0, 0, scale, 0, 0);

	// Redraw canvas.
	dirty = true;
}

window.on_horizontal = null;
window.on_vertical   = null;

let previous_w = window.innerWidth;
let previous_h = window.innerHeight;

window.addEventListener('resize', _ => {
	adjust_canvas();
	let w = window.innerWidth;
	let h = window.innerHeight;
	if (previous_w > previous_h && w < h) {
		if (on_vertical !== null) on_vertical();
	} else if (previous_w < previous_h && w > h) {
		if (on_horizontal !== null) on_horizontal();
	}
	previous_w = w;
	previous_h = h;
});

window.canvas_touch = null;

page_touch = (page_x, page_y) => {
	if (canvas_touch !== null) {
		const design_x = (page_x - left) / scale;
		const design_y = (page_y - top ) / scale;
		canvas_touch(design_x, design_y);
	}
};

///////////////////////////////////////////////////////////
//                       animation                       //
///////////////////////////////////////////////////////////

window.drawables  = [];
window.updatables = [];
window.touchables = [];

canvas_touch = (x, y) => {
	for (let i = 0; i < touchables.length; ++i) {
		if (touchables[i].touch(x, y)) break;
	}
};

let previous_time = new Date().getTime() / 1000;

function animation_loop() {
	const current_time = new Date().getTime() / 1000;
	if (dirty) {
//		ctx.fillStyle = 'black'; // window.background_color;
//		ctx.fillRect(0, 0, design_width, design_height);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);	
		ctx.clearRect(0, 0, a_canvas.width, a_canvas.height);
		ctx.restore();
		drawables.forEach(o => o.draw(ctx));
		dirty = false;
	}
	let dt = current_time - previous_time;
	updatables.slice().forEach(o => o.update(dt));
	previous_time = current_time;
	requestAnimationFrame(animation_loop);
}

addEventListener('load', () => {
	if (horizontal() && on_horizontal !== null) {
		on_horizontal();
	} else if (vertical() && on_vertical !== null) {
		on_vertical();
	}
	adjust_canvas();
	requestAnimationFrame(animation_loop);
});

window.add_touchable = function(o) {
	if (!touchables.includes(o)) {
		touchables.push(o);
	}
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

window.add_drawable = function(o) {
	if (!('z_index' in o)) {
		throw new Error(o);
	}
	if (!drawables.includes(o)) {
		dirty = true;
		for (let i = drawables.length; i > 0; --i) {
			if (o.z_index >= drawables[i - 1].z_index) {
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
