'use strict';

console.log('');
console.log('The wonderful USB Rocket Launcher controls');
console.log('******************************************');
console.log('');

let USBmissiles = require('./usb-missiles');

let num = USBmissiles.getNumAvailable();
if(num < 1) {
	console.error('No accessible Missile Launcher found!');
	process.exit();
} else {
	console.log('Found '+num+' launcher'+(num>1?'s':''));
}

console.log('');
console.log('*************************');
console.log('');
console.log('Use your keys as follows:')
console.log('');
console.log('[Q] [W] [E]'); //'     [R]');
console.log(' [A] [S] [D] [F]                [L]');
console.log('  [Y] [X] [C]         [B]');
console.log('');
console.log('[Q] = upleft');
console.log('[W] = up');
console.log('[E] = upright');
// console.log('[R] = reset');
console.log('[A] = left');
console.log('[S] = stop');
console.log('[D] = right');
console.log('[Y] = downleft');
console.log('[X] = down');
console.log('[C] = downright');
console.log('');
console.log('[L] = led on/off');
console.log('');
console.log('[F] = !fire!');
console.log('[B] = !burst!');
console.log('');
console.log('CTRL + C will end the program!');
console.log('');

let keyMap = {
	q: 'upleft',
	a: 'left',
	d: 'right',
	w: 'up',
	e: 'upright',
	y: 'downleft',
	x: 'down',
	c: 'downright',
	s: 'stop',
	f: 'fire',
	// r: 'reset',
	// b: 'boom'
	b: 'burst',
	l: 'led',
	t: 'test'
};

let ledOn = false;
let stdin = process.stdin;
// give every character:
stdin.setRawMode(true);
// node app won't quit all by itself unless an error or process.exit() happens:
stdin.setEncoding('utf8');
stdin.resume();
stdin.on( 'data', function( key ){
	// ctrl-c
	if(key === '\u0003') {
		process.exit();
	}
	let func = keyMap[key];
	if(func === 'led') {
		func += ledOn ? 'off' : 'on';
		ledOn = !ledOn;
	}
	if(typeof USBmissiles[func] !== 'function') {
		console.error('Command not found!');
	} else {
		process.stdout.clearLine();
		process.stdout.write(' -> Executing "'+func+'"\r')
		USBmissiles[func]();
	}
});
