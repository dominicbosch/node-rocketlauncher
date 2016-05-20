
'use strict';

let execute = require('child_process').exec;

exports.shoot = (cb) => {
	execute('raspistill -n -t 0 -w 1024 -h 768 -hf -vf -o -',
		{ maxBuffer: 5*1024*1024 }, // 5MB
		(err, stdout, stderr) => {
			console.log(err);
			console.log(stderr);
			if(err) return console.error('exec error: ' + err);
			cb(stdout)//.pipe(inChannel);
		}
	);
}
	// execute('raspistill', [
	// 		'--nopreview',
	// 		'--timeout', ' 0',
	// 		'--width', ' 1024',
	// 		'--height', '768',
	// 		'--hflip', '--vflip',
	// 		'-o', '-'
	// 	]