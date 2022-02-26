const phi = 1.6180339887;
let audio = null;
let w     = null;

let o1 = null;
let o2 = null;
let o3 = null;
let o4 = null;

let a1 = null;
let a2 = null;
let a3 = null;
let a4 = null;

let p1 = null;
let p2 = null;
let p3 = null;
let p4 = null;

let f = 80;
let a = 3;
let p = 10;

const init = _ => {
	if (w !== null) {
		w.gain.setTargetAtTime(1, audio_context.currentTime, .1);
	}
	w = audio_context.createGain();
	w.gain.value = 0;
	w.connect(audio_context.destination);

	const w1 = audio_context.createGain();
	const w2 = audio_context.createGain();
	const w3 = audio_context.createGain();
	const w4 = audio_context.createGain();

	w1.gain.value = 1;
	w2.gain.value = .8;
	w3.gain.value = .4;
	w4.gain.value = .1;

	w1.connect(w);
	w2.connect(w);
	w3.connect(w);
	w4.connect(w);

	o1 = audio_context.createOscillator();
	o2 = audio_context.createOscillator();
	o3 = audio_context.createOscillator();
	o4 = audio_context.createOscillator();

	o1.frequency.value = f;
	o2.frequency.value = o1.frequency.value * phi;
	o3.frequency.value = o2.frequency.value * phi;
	o4.frequency.value = o3.frequency.value * phi;

	a1 = audio_context.createOscillator();
	a2 = audio_context.createOscillator();
	a3 = audio_context.createOscillator();
	a4 = audio_context.createOscillator();

	a1.frequency.value = a;
	a2.frequency.value = a1.frequency.value + 1;
	a3.frequency.value = a2.frequency.value + 1;
	a4.frequency.value = a3.frequency.value + 1;

	p1 = audio_context.createOscillator();
	p2 = audio_context.createOscillator();
	p3 = audio_context.createOscillator();
	p4 = audio_context.createOscillator();

	p4.frequency.value = 1 / p;
	p3.frequency.value = p4.frequency.value / phi;
	p2.frequency.value = p3.frequency.value / phi;
	p1.frequency.value = p2.frequency.value / phi;

	const oa1 = audio_context.createGain();
	const oa2 = audio_context.createGain();
	const oa3 = audio_context.createGain();
	const oa4 = audio_context.createGain();

	const oap1 = audio_context.createGain();
	const oap2 = audio_context.createGain();
	const oap3 = audio_context.createGain();
	const oap4 = audio_context.createGain();

	o1.connect(oa1);
	o2.connect(oa2);
	o3.connect(oa3);
	o4.connect(oa4);

	a1.connect(oa1.gain);
	a2.connect(oa2.gain);
	a3.connect(oa3.gain);
	a4.connect(oa4.gain);

	oa1.connect(oap1);
	oa2.connect(oap2);
	oa3.connect(oap3);
	oa4.connect(oap4);

	p1.connect(oap1.gain);
	p2.connect(oap2.gain);
	p3.connect(oap3.gain);
	p4.connect(oap4.gain);

	oap1.connect(w1);
	oap2.connect(w2);
	oap3.connect(w3);
	oap4.connect(w4);

	o1.start();
	o2.start();
	o3.start();
	o4.start();
	a1.start();
	a2.start();
	a3.start();
	a4.start();
	p1.start();
	p2.start();
	p3.start();
	p4.start();
};

export const music = {
	start: _ => {
		if (w === null) init();
		w.gain.setTargetAtTime(1, audio_context.currentTime, .1);
	},
	stop: _ => {
		w.gain.setTargetAtTime(0, audio_context.currentTime, .1);
	}
};
