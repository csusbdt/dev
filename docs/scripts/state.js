function c_state(name, initial) {
    this.name = name;
    this.state = null;    
    let state_string = localStorage.getItem(name);
    if (state_string === null) {
    	this.state = initial;
    } else {
    	this.state = JSON.parse(state_string);
        if ('version' in this.state) {
            if (this.state.version === initial.version) {
                // version matches saved version so use saved state
            } else {
                // new version so reinitialize
                this.state = initial;
            }
        } else {
            if ('version' in initial) {
                // version added to state so reinitialize
                this.state = initial;
            } else {
                // version not used so use saved state
            }
        }
    }    
}

c_state.prototype.get = function(key) {
    if (key in this.state) {
        return this.state[key];
    } else {
        return null;
    }
};

c_state.prototype.set = function(key, value) {
    this.state[key] = value; 
    localStorage.setItem(this.name, JSON.stringify(this.state));
};

let state = null;

export const get_state = function(name, initial = null) {
    if (state !== null) throw new Error("get_state should be called only once");
    state = new c_state(name, initial);
    return state;
};

export const set = function(key, value) {
    return state.set.bind(state, key, value);
}