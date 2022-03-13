export function c_image(i, x = 0, y = 0, z = 0, s = 1) {
    this.i     = i;
    this.x     = x;
    this.y     = y;
    this.z     = z;
    this.s     = s;
    this.start_set = [];
	this.stop_set  = [];
}

c_image.prototype.vert = mixin.vert;
c_image.prototype.check_vert = mixin.check_vert;

c_image.prototype.starts = mixin.starts;
c_image.prototype.stops  = mixin.stops;

c_image.prototype.start = function() {
	add_drawable(this);
    stop_stop_sets(this.stop_set);
	start_start_sets(this.start_set);
	return this;
};

c_image.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

c_image.prototype.started = function() {
	return drawables.includes(this);
};

c_image.prototype.stopped = function() {
	return !drawables.includes(this);
};

c_image.prototype.draw = function(ctx, x = 0, y = 0, z = 0, s = 1) {
	this.check_vert();
	ctx.save();
    ctx.scale(this.s, this.s);
    ctx.translate(-this.i.width/2, -this.i.height/2);
    ctx.translate(this.x/this.s, this.y/this.s);
    ctx.drawImage(this.i, 0, 0);
    ctx.restore();
};

c_image.prototype.copy = function(i) {
    const img = new c_image(i, this.x, this.y, this.z, this.s);
    if (this.hx !== undefined) {
        img.hx = this.hx;
        img.hy = this.hy;
        img.vx = this.vx;
        img.vy = this.vy;
    }
    return img;
};

export function image(i, x = 0, y = 0, z = 0, s = 1) {
    return new c_image(i, x, y, z, s);
}

export function background(i) {
    const o = image(i, 0, 0, -10000);
    const org_start = o.start.bind(o);
    o.start = _ => {
        set_design(i.width, i.height);
//        add_drawable(o);
        return org_start();
//    	return o;
    }
    return o;
}
