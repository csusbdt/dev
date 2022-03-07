export function c_image(i, x = 0, y = 0, z = 0, s = 1) {
    this.i     = i;
    this.x     = x;
    this.y     = y;
    this.z     = z;
    this.s     = s; 
}

c_image.prototype.start = function() {
	add_drawable(this);
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
	ctx.save();
    ctx.scale(this.s, this.s);
    ctx.translate(-this.i.width/2, -this.i.height/2);
    ctx.translate(this.x/this.s, this.y/this.s);
    ctx.drawImage(this.i, 0, 0);
    ctx.restore();
};

export function image(i, x = 0, y = 0, z = 0, s = 1) {
    return new c_image(i, x, y, z, s);
}

export function background(i) {
    const o = image(i, 0, 0, -10000);
    o.start = _ => {
        set_design(i.width, i.height);
        add_drawable(o);
    	return o;
    }
    return o;
}
