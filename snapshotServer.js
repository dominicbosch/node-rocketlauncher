'use strict';

let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let spawn = require('child_process').spawn;

let outPath = './wwwroot/snapshot.jpg'
let args = [
	'-vf', '-hf', // vertical and horizontal flip
	'-w', '1024',
	'-h', '768',
	'-t', '300',
	'-o', outPath
];

app.use('/', express.static(path.join(__dirname, 'wwwroot')));

let proc;
let i = 0;
function shootPicture() {
	let id = i++;
	proc = spawn('raspistill', args);
	proc.stdout.on('data', (data) => {
		console.log(`stdout: ${id}: ${data}`);
	});
	proc.stderr.on('data', (data) => {
		console.log(`stderr: ${id}: ${data}`);
	});

	proc.on('close', (code) => {
		console.log(`child process ${id} exited with code ${code}`);
		io.sockets.emit('imageUpdate', 'snapshot.jpg?_t=' + (Math.random() * 100000));
   
	});
}

setInterval(() => {
	shootPicture()
}, 1000)
