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

//	ctx.setTransform(1, 0, 0, 1, 0, 0);
//    const s = (dw === null) ? 1 : Math.min(canvas.width / dw, canvas.height / dh);
//    ctx.scale(s, s);
//    ctx.translate(canvas.width / s / 2, canvas.height / s / 2);

    
    
	ctx.setTransform(1, 0, 0, 1, 0, 0);
    const ds = (dw === null) ? this.s * s : this.s * s * Math.min(canvas.width / dw, canvas.height / dh);
    ctx.scale(ds, ds);
    ctx.translate(-this.i.width / 2, -this.i.height / 2);
    ctx.translate(canvas.width / ds / 2, canvas.height / ds / 2);
    ctx.drawImage(this.i, this.x, this.y);
    ctx.restore();
};

export function image(i, x = 0, y = 0, z = 0, s = 1) {
    return new c_image(i, x, y, z, s);
}

export function background(i) {
    window.dw = i.width;
    window.dh = i.height; 
    return image(i, 0, 0, -10000);
}
