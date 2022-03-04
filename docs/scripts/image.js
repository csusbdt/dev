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
	ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (dw === null) {
    	ctx.scale(this.s, this.s);
        ctx.translate(-this.i.width / 2, -this.i.height / 2);
    	ctx.translate(canvas.width / 2 / s, canvas.height / 2 / s);        
    	ctx.translate(this.x, this.y);        
    } else {
    	const ds = Math.min(canvas.width / dw, canvas.height / dh);
    	ctx.scale(ds * this.s, ds * this.s);
        ctx.translate(-this.i.width / 2, -this.i.height / 2);
    	ctx.translate(this.x / this.s / ds, this.y / this.s / ds);        
    	ctx.translate(canvas.width / this.s / ds / 2, canvas.height / this.s / ds / 2);        
    }
    ctx.drawImage(this.i, 0, 0);
    ctx.restore();
};

export function image(i, x = 0, y = 0, z = 0, s = 1) {
    return new c_image(i, x, y, z, s);
}

export function bg(i) {
    window.dw = i.width;
    window.dh = i.height; 
    return image(i, 0, 0, -10000);
}
