'use strict';

let spawn = require('child_process').spawn;

exports = module.exports = (function() {
	let procVideo;
	return {
		start: function() {
			if(procVideo) {
				console.warn('Video process is already running, '
					+ 'thus stopping this one and starting a new one.');
				procVideo.kill('SIGINT');
			}
			procVideo = spawn('raspivid', [
				'--nopreview',
				'--timeout', '0',
				'--width', '1024',
				'--height', '768',
				'--hflip', '--vflip',
				'-o', '-'
			], {
				stdio: ['ignore', 'pipe', 'inherit']
			});
		},
		pipe: function(inChannel) {
			if(procVideo) procVideo.stdout.pipe(inChannel),
			else console.warn('No video process running!')
		}
		stop: function() {
			if(procVideo) procVideo.kill('SIGINT');
			else console.warn('No video process running!')
		}
	}
})();