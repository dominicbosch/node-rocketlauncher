'use strict';

let USBmissiles = require('./usb-missiles');
// let videoStream = require('raspivid-stream');
let snap = require('raspicam-snapshot');
let cv = require('opencv');
// let spawn = require('child_process').spawn;

let num = USBmissiles.getNumAvailable();
if(num < 1) {
	console.error('No accessible Missile Launcher found!');
	process.exit();
} else {
	console.log('Found '+num+' launcher'+(num>1?'s':''));
}



// videoStream.start();
// videoStream.pipe(procGstLaunch.stdin);

// cv.readImage("./test.jpg", function(err, im){
snap.shoot((buffer) => {
	cv.readImage(buffer, function(err, im){
		im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
			for (var i=0;i<faces.length; i++){
				var x = faces[i];
				im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
			}
			im.save('./out.jpg');
		});
	})
})

