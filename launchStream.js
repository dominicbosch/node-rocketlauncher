'use strict';

let videoStream = require('raspivid-stream');
let spawn = require('child_process').spawn;
let procGstLaunch;

process.on('exit', () => {
	if(procGstLaunch) procGstLaunch.kill('SIGINT');
	videoStream.stop();
});

let argsGstLaunch = [
	'fdsrc',
	'!', 'h264parse',
	'!', 'rtph264pay', 'config-interval=1', 'pt=96',
	'!', 'gdppay',
	'!', 'udpsink', 'host=192.168.0.20', 'port=5000'
];

procGstLaunch = spawn('gst-launch-1.0', argsGstLaunch);
videoStream.start();
videoStream.pipe(procGstLaunch.stdin);


// var args = [ './child.js', /* command arguments */ ];
// var child = spawn(process.execPath, args, { stdio: ['pipe', 1, 2, 'ipc'] });
// file.pipe(child.stdin);


// var child_process = require('child_process');

// var opts = {
//     stdio: [process.stdin, process.stdout, process.stderr, 'pipe', 'pipe']
// };
// var child = child_process.spawn('node', ['./b.js'], opts);

// child.stdio[3].write('First message.\n', 'utf8', function() {
//     child.stdio[3].write('Second message.\n', 'utf8', function() {

//     });
// }); 

// child.stdio[4].pipe(process.stdout);

// raspivid -t 0 -hf -vf -fps 20 -w 1024 -h 768 -o - | gst-launch-1.0 fdsrc ! h264parse ! rtph264pay config-interval=1 pt=96 ! gdppay ! udpsink host=192.168.0.20 port=5000