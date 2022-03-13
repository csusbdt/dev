function c_circle(x, y, r, z = 0, d = 1/8) {
	this.x = x;
	this.y = y;
	this.r = r;
    this.z = z;
    this.d = d;
}

c_circle.prototype.vert = mixin.vert;
c_circle.prototype.check_vert = mixin.check_vert;

c_circle.prototype.start = function() {
	add_drawable(this);
	return this;
};

c_circle.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

c_circle.prototype.started = function() {
	return drawables.includes(this);
};

c_circle.prototype.stopped = function() {
	return !drawables.includes(this);
};

c_circle.prototype.inside = function(x, y) {
	this.check_vert();
	return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < this.r * this.r;
};

c_circle.prototype.draw = function(ctx) {
	this.check_vert();
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
};

export const circle = function(x, y, r, z = 0, d = 1/8) {
	return new c_circle(x, y, r, z, d);
};
