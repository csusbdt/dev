function c_frame(image = null, duration = 1 / 8, x = 0, y = 0, pivot_x = 0, pivot_y = 0, scale = 1) {
	this.image = image;
	this.duration = duration;
	this.x        = x;
	this.y        = y;
	this.pivot_x  = pivot_x;
	this.pivot_y  = pivot_y;
	this.scale    = scale;
}

c_frame.prototype.vert = mixin.vert;
c_frame.prototype.check_vert = mixin.check_vert;

c_frame.prototype.draw = function(ctx, x = 0, y = 0, pivot_x = 0, pivot_y = 0, scale = 1) {
	this.check_vert();
	if (this.image !== null) {
		ctx.save();
        ctx.translate(-this.image.width / 2, -this.image.height / 2);
		ctx.translate(this.pivot_x + pivot_x, this.pivot_y + pivot_y);
		ctx.scale(this.scale * scale, this.scale * scale);
		ctx.translate(-this.pivot_x - pivot_x, -this.pivot_y - pivot_y);
		ctx.drawImage(
			this.image, 0, 0, this.image.width, this.image.height, 
			this.x + x, this.y + y, this.image.width, this.image.height
		);
		ctx.restore();
	}
};

//c_frame.prototype.copy = function(x, y, scale = 1, pivot_x = 0, pivot_y = 0) {
//	return new c_frame(this.image, this.duration, x, y, scale, pivot_x, pivot_y);
//};

c_frame.prototype.copy_scaled = function(scale) {
	return new c_frame(this.image, this.duration, this.x, this.y, this.pivot_x, this.pivot_y, scale);
};

/*
c_frame.prototype.scale = function(pivot_x, pivot_y, s) {
	if (pivot_x === undefined) {
		pivot_x = this.image.width / 2;
	}
	if (pivot_y === undefined) {
		pivot_y = this.image.height / 2;
	}
	this.s  = s;
	this.pivot_x = pivot_x;
	this.pivot_y = pivot_y;
	return this;
};
*/

export function frame(image = null, duration = 1/8, x = 0, y = 0, pivot_x = 0, pivot_y = 0, scale = 1) {
	return new c_frame(image, duration, x, y, pivot_x, pivot_y, scale);
}

export function frames(images, duration = 1/8, x = 0, y = 0, pivot_x = 0, pivot_y = 0, scale = 1) {
	if (Array.isArray(images)) {
		return images.map(image => new c_frame(image, duration, x, y, pivot_x, pivot_y, scale));
	} else {
        return [ new c_frame(images, duration, x, y, pivot_x, pivot_y, scale) ];
	}
};
