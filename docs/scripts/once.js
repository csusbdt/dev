function c_once(frames) {
	this.frames = frames;
	this.start_set = [];
	this.stop_set  = [];
}

//c_once.prototype.vert = mixin.vert;
//c_once.prototype.check_vert = mixin.check_vert;

//c_once.prototype.copy = function() {
//	return new c_once(this.frames, this.x, this.y);	
//};

c_once.prototype.starts = mixin.starts;
c_once.prototype.stops  = mixin.stops;

c_once.prototype.started = function() {
	return updatables.includes(this);
};

c_once.prototype.start = function() {
	this.frame_index = 0;
	this.elapsed_time = 0;
	add_updatable(this);
	add_drawable(this.frames[0].drawable);
	return this;
};

//c_once.prototype.draw = function(ctx) {
//	this.check_vert();
//	this.frames[this.frame_index].draw(ctx, this.x, this.y, this.s);
//};

c_once.prototype.update = function(dt) {
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
        remove_drawable(this.frames[this.frame_index].drawable);
		++this.frame_index;
		if (this.frame_index === this.frames.length) {
			remove_updatable(this);
			stop_stop_sets(this.stop_set);
			start_start_sets(this.start_set);
		} else {
            add_drawable(this.frames[this.frame_index].drawable);
        }
		dirty = true;
	}
};

export const once = function(frames) {
	if (Array.isArray(frames)) {
		return new c_once(frames);
	} else {
		return new c_once([frames]);
	}
};
