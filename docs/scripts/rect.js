function c_rect(x, y, w, h, z = 0) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    this.z = z;
}

c_rect.prototype.vert = function(x, y, w, h) {
	this.hx = this.x;
	this.hy = this.y;
	this.hw = this.w;
	this.hh = this.h;
	this.vx = x;
	this.vy = y;
	this.vw = w;
	this.vh = h;
	return this;
};

c_rect.prototype.check_vert = function() {
    if (this.vx === undefined) return;
    if (horizontal()) {
    	this.x = this.hx;
    	this.y = this.hy;
    	this.w = this.hw;
    	this.h = this.hh;            
    } else {
    	this.x = this.vx;
    	this.y = this.vy;
    	this.w = this.vw;
    	this.h = this.vh;            
    }
};

c_rect.prototype.start = function() {
	add_drawable(this);
	return this;
};

c_rect.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

c_rect.prototype.started = function() {
	return drawables.includes(this);
};

c_rect.prototype.stopped = function() {
	return !drawables.includes(this);
};

c_rect.prototype.inside = function(x, y) {
    this.check_vert();
	return (
        x >= this.x - this.w / 2 && 
        x <  this.x + this.w / 2 && 
        y >= this.y - this.h / 2 && 
        y <  this.y + this.h / 2
    );
};

c_rect.prototype.draw = function(ctx) {
    this.check_vert();
	ctx.save();
    ctx.beginPath();
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.stroke();
    ctx.restore();
};

export const rect = function(x, y, w, h, z = 0) {
	return new c_rect(x, y, w, h, z);
};
