function c_text(t, f, x, y, z = 0) {
    this.t = t;
    this.f = f;
	this.x = x;
	this.y = y;
    this.z = z;
}

c_text.prototype.start = function() {
	add_drawable(this);
	return this;
};

c_text.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

c_text.prototype.started = function() {
	return drawables.includes(this);
};

c_text.prototype.stopped = function() {
	return !drawables.includes(this);
};

c_text.prototype.draw = function(ctx) {
//    this.check_vert();
	ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = this.f;
    ctx.fillText(this.t, this.x, this.y);
    ctx.restore();
};

export const text = function(t, f, x, y, z = 0) {
	return new c_text(t, f, x, y, z);
};
