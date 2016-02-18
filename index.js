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
console.log('    [W]');
console.log('[A] [S] [D] [F]');
console.log('    [Y]');
console.log('');
console.log('[W] = up');
console.log('[A] = left');
console.log('[S] = stop');
console.log('[D] = right');
console.log('[F] = !fire!');
console.log('[Y] = down');
console.log('');

let keyMap = {
	'a': 'left',
	'd': 'right',
	'w': 'up',
	'y': 'down',
	's': 'stop',
	'f': 'fire'
};

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
	if(typeof USBmissiles[func] !== 'function') {
		console.error('Command not found!');
	} else {
		console.log(' -> '+func)
		USBmissiles[func]();
	}
});
