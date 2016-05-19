
'use strict';

let execute = require('child_process').exec;

exports.shoot = (inChannel) => {
	execute('raspistill', [
			'--nopreview',
			'--timeout', '0',
			'--width', '1024',
			'--height', '768',
			'--hflip', '--vflip',
			'-o', '-'
		], (err, stdout, stderr) => {
			if(err) return console.error('exec error: ' + err);
			stdout.pipe(inChannel);
		}
	);
}