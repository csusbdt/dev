function c_circle(x, y, r, z = 0, d = 1/8) {
	this.x = x;
	this.y = y;
	this.r = r;
    this.z = z;
    this.d = d;
}

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
    //
    //  TODO
    //
//    const s = Math.min(canvas.width / dw, canvas.height / dh);
//	return (this.x * s - x) * (this.x * s - x) + (this.y * s - y) * (this.y * s - y) < this.r * s * this.r * s;
	return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < this.r * this.r;
};

c_circle.prototype.draw = function(ctx) {
//	ctx.save();
//	ctx.setTransform(1, 0, 0, 1, 0, 0);
//    ctx.beginPath();
//    const s = (dw === null) ? 1 : Math.min(canvas.width / dw, canvas.height / dh);
//    ctx.scale(s, s);
//    ctx.translate(canvas.width / s / 2, canvas.height / s / 2);
//    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
//    ctx.stroke();
//    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
};

export const circle = function(x, y, r, z = 0, d = 1/8) {
	return new c_circle(x, y, r, z, d);
};
