function c_circle(x, y, r, z = 0) {
	this.x = x;
	this.y = y;
	this.r = r;
    this.z = z;
//    this.w = w;
//    this.h = h;
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
    const s = Math.min(canvas.width / dw, canvas.height / dh);
	return (this.x * s - x) * (this.x * s - x) + (this.y * s - y) * (this.y * s - y) < this.r * s * this.r * s;
};

c_circle.prototype.draw = function(ctx) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const s = Math.min(canvas.width / this.w, canvas.height / this.h);
    ctx.scale(s, s);
    ctx.translate(canvas.width / 2 / s, canvas.height / 2 / s);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);    
    ctx.stroke();
    ctx.restore();
};

export const circle = function(x, y, r, z = 0) {
	return new c_circle(x, y, r, z);
};
