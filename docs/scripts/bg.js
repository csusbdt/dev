export function c_image(src, x = 0, y = 0, z = 0, s = 1) {
    this.i     = new Image();
    this.i.src = src;
    this.x     = x;
    this.y     = y;
    this.z     = z;
    this.s     = s; 
    this.fill_canvas = false;
}

c_image.prototype.fill = function() {
    this.fill_canvas = true;
    return this;
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
    if (this.i.complete) {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	const s = Math.min(canvas.width / this.w, canvas.height / this.h);
	ctx.scale(s, s);
	ctx.translate(canvas.width / 2 / s, canvas.height / 2 / s);

//        ctx.save();
//        ctx.setTransform(1, 0, 0, 1, 0, 0);
        let scale = this.s * s;
        if (this.fill_canvas) {
            scale = Math.min(canvas.width / this.i.width, canvas.height / this.i.height);
        }
        ctx.scale(scale, scale);
        ctx.translate(-this.i.width / 2, -this.i.height / 2);
        ctx.translate(canvas.width / 2 / scale, canvas.height / 2 / scale);
        ctx.drawImage(this.i, 0, 0);
        ctx.restore();
    }
};

export function image(src, x = 0, y = 0, z = 0, s = 1) {
    return new c_image(src, x, y, z, s);
}
