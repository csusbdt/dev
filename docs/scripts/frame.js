function c_frame(drawable = null, duration = 1/8) {
	this.drawable = drawable;
	this.duration = duration;
}

//c_frame.prototype.vert = mixin.vert;
//c_frame.prototype.check_vert = mixin.check_vert;

//c_frame.prototype.start = function() {
//	add_drawable(this);
//	return this;
//};

//c_frame.prototype.stop = function() {
//	remove_drawable(this);
//	return this;
//};

//c_frame.prototype.started = function() {
//	return drawables.includes(this);
//};

//c_frame.prototype.stopped = function() {
//	return !drawables.includes(this);
//};

/*
c_frame.prototype.draw = function(ctx, x = 0, y = 0, s = 1) {
	this.check_vert();
	if (this.i !== null) {
		ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(this.s * s, this.s * s);
        ctx.translate(-this.i.width / 2, -this.i.height / 2);
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
		ctx.drawImage(
			this.i, this.x + x, this.y + y, this.i.width, this.i.height, 
			this.x + x, this.y + y, this.i.width, this.i.height
		);
		ctx.restore();
	}
};
*/

//c_frame.prototype.copy = function(x, y, scale = 1, pivot_x = 0, pivot_y = 0) {
//	return new c_frame(this.image, this.duration, x, y, scale, pivot_x, pivot_y);
//};

//c_frame.prototype.copy_scaled = function(s) {
//	return new c_frame(this.i, this.d, this.x, this.y, this.z, s);
//};

/*
c_frame.prototype.scale = function(pivot_x, pivot_y, s) {
	if (pivot_x === undefined) {
		pivot_x = this.image.width / 2;
	}
	if (pivot_y === undefined) {
		pivot_y = this.image.height / 2;
	}
	this.s  = s;
	this.pivot_x = pivot_x;
	this.pivot_y = pivot_y;
	return this;
};
*/

export function frame(drawable = null, duration = 1/8) {
	return new c_frame(drawable, duration);
}

export function frames(drawables = [], duration = 1/8) {
	return drawables.map(drawable => new c_frame(drawable, duration));
};
