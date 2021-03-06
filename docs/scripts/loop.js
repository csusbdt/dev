export function c_loop(frames = [], x = 0, y = 0, z = 10) {
	this.frames = frames;
	this.x = x;
	this.y = y;
	this.z = z;
    this.start_set = [];
	this.stop_set  = [];
}

c_loop.prototype.vert = mixin.vert;
c_loop.prototype.check_vert = mixin.check_vert;

c_loop.prototype.starts = mixin.starts;
c_loop.prototype.stops  = mixin.stops;

c_loop.prototype.start = function() {
	this.frame_index  = 0;
	this.elapsed_time = 0;
	add_drawable(this);
	add_updatable(this);
    stop_stop_sets(this.stop_set);
	start_start_sets(this.start_set);
	return this;
};

c_loop.prototype.stop = function() {
	remove_drawable(this);
	remove_updatable(this);
	return this;
};

c_loop.prototype.started = function() {
	return drawables.includes(this);
};

c_loop.prototype.stopped = function() {
	return !drawables.includes(this);
};

c_loop.prototype.draw = function(ctx) {
	this.check_vert();
	this.frames[this.frame_index].draw(ctx, this.x, this.y);
};

c_loop.prototype.update = function(dt) {
	if (this.frames.length === 1) {
		// ensure an initial draw after start
		if (this.elapsed_time === 0) {
			this.elapsed_time = dt;
			dirty = true;
		}
		return;
	}
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
		++this.frame_index;
		dirty = true;
		if (this.frame_index === this.frames.length) {
			this.frame_index = 0;
		}
	}
};

export function loop(frames, x = 0, y = 0, z = 10) {
	if (Array.isArray(frames)) {
		return new c_loop(frames, x, y, z);
	} else {
		return new c_loop([frames], x, y, z);
	}
}
