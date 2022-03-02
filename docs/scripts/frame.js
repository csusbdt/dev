function c_frame(i = null, d = 1/8, z = 0, x = 0, y = 0, s = 1) {
	this.image    = i;
	this.duration = d;
	this.z_index  = z;
	this.x        = x;
	this.y        = y;
	this.s        = s;
}

c_frame.prototype.vert = mixin.vert;
c_frame.prototype.check_vert = mixin.check_vert;

c_frame.prototype.start = function() {
	add_drawable(this);
	return this;
};

c_frame.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

c_frame.prototype.started = function() {
	return drawables.includes(this);
};

c_frame.prototype.stopped = function() {
	return !drawables.includes(this);
};


c_frame.prototype.draw = function(ctx, x = 0, y = 0) {
	this.check_vert();
	if (this.image !== null) {
		ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(this.s, this.s);
        ctx.translate(-this.image.width / 2, -this.image.height / 2);
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
		ctx.drawImage(
			this.image, this.x + x, this.y + y, this.image.width, this.image.height, 
			this.x + x, this.y + y, this.image.width, this.image.height
		);
		ctx.restore();
	}
};

//c_frame.prototype.copy = function(x, y, scale = 1, pivot_x = 0, pivot_y = 0) {
//	return new c_frame(this.image, this.duration, x, y, scale, pivot_x, pivot_y);
//};

c_frame.prototype.copy_scaled = function(scale) {
	return new c_frame(this.image, this.duration, this.x, this.y, this.pivot_x, this.pivot_y, scale);
};

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

export function frame(i = null, d = 1/8, z = 0, x = 0, y = 0, s = 1) {
	return new c_frame(i, d, z, x, y, s);
}

export function frames(a = [], d = 1/8, z = 0, x = 0, y = 0, s = 1) {
	return a.map(i => new c_frame(i, d, z, x, y, s));
};
