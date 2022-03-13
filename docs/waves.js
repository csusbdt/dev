const phi = 1.6180339887;
let w = null;

function wave(v, f, a, p) {
    if (w === null) {
    	w = audio_context.createGain();
    	w.gain.value = 0;
    	w.connect(audio_context.destination);
    }
    const o_f = audio_context.createOscillator();
    const o_a = audio_context.createOscillator();
    const o_p = audio_context.createOscillator();
    
    o_f.frequency.value = f;
	o_a.frequency.value = a;    
    o_p.frequency.value = 1 / p;

    const g_a = audio_context.createGain();
    const g_p = audio_context.createGain();
    const g_v = audio_context.createGain();

    o_a.connect(g_a.gain);
    o_p.connect(g_p.gain);
    g_v.gain.value = v;

    o_f.connect(g_a);
    g_a.connect(g_p);
    g_p.connect(g_v);
    
    g_v.connect(w);
    o_f.start();
    o_a.start();
    o_p.start();
}

const init = _ => {
    wave(1, 180, 3, 20);
    wave(1, 180 * phi, 3.1, 27);
};

export const waves = {
	start: _ => {
		if (w === null) init();
		w.gain.setTargetAtTime(1, audio_context.currentTime, .1);
	},
	stop: _ => {
		w.gain.setTargetAtTime(0, audio_context.currentTime, .1);
	}
};
