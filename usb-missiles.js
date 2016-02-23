'use strict';

let usb = require('usb');

// console.log(usb);

let arrKnownMissiles = [
	// '6465:32801',
	// '2689:1793',
	// '2689:65281',
	// '4400:514',
	'8483:4112'
];

let CMD = {
	down:  0x01,
	up:    0x02,
	left:  0x04,
	right: 0x08,
	fire:  0x10,
	stop:  0x20
	// ,
	// boom:  0x40,
	// reset: 'l8000,d2000'
}

function getAvailableDevices() {
	return usb.getDeviceList().filter(function(d) {
		let desc = d.deviceDescriptor;
		let identifier = desc.idVendor+':'+desc.idProduct;
		if(arrKnownMissiles.indexOf(identifier) > -1) {
			console.log('Found Rocket Launcher! Trying to access it...')
			try {
				d.open();

				if(d.interfaces[0].isKernelDriverActive()) {
					console.log('Reattaching Kernel driver');
					d.interfaces[0].detachKernelDriver();
				}
				// d.interfaces[0].attachKernelDriver();
				d.interfaces[0].claim();
				return true;
			} catch(err) {
				console.error('Unable to connect Rocket Launcher! Maybe you should sudo!');
				return false;
			}
		}
		return false;
	});
}

// Could also use built in function: usb.findByIds(vid, pid)
let arrFoundMissiles = getAvailableDevices();

exports.getNumAvailable = function() {
	return arrFoundMissiles.length;
};

function sendCommand(signal, firstByte) {
	if(!firstByte) firstByte = 0x02;
	let b = new Buffer([firstByte, signal, 0x00,0x00,0x00,0x00,0x00,0x00]);
	// console.log(b);
	for(let i = 0; i < arrFoundMissiles.length; i++) {
		// controlTransfer(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback(error, data))
		// arrFoundMissiles[i].controlTransfer(0x21, 0x09, b.length, 0x0200, b, function(err, data) {
		arrFoundMissiles[i].controlTransfer(0x21, 0x09, 0x0, 0x0, b, function(err, data) {
			if(err && err.errno === usb.LIBUSB_ERROR_NO_DEVICE){
				console.error('DEVICE Hang up! Reconnecting...');
				arrFoundMissiles = getAvailableDevices();
			}
			if(err) console.log('err', err.message);
			// console.log('data', data);
		})
	}
}

let timer;
let numShots;
exports.stop = function() {
	clearInterval(timer);
	sendCommand(CMD.stop)
};
exports.down = function() { sendCommand(CMD.down) };
exports.up = function() { sendCommand(CMD.up) };
exports.left = function() { sendCommand(CMD.left) };
exports.right = function() { sendCommand(CMD.right) };

exports.downright = function() { sendCommand(CMD.down+CMD.right) };
exports.upright = function() { sendCommand(CMD.up+CMD.right) };
exports.downleft = function() { sendCommand(CMD.down+CMD.left) };
exports.upleft = function() { sendCommand(CMD.up+CMD.left) };

exports.ledon = function() { sendCommand(0x01, 0x03) };
exports.ledoff = function() { sendCommand(0x00, 0x03) };

exports.fire = function() { sendCommand(CMD.fire) };
exports.burst = function() {
	numShots = 0;
	exports.fire(); // Initial shot before all others follow
	timer = setInterval(() => {
		if(++numShots === 4) exports.stop();
		else exports.fire();
	}, 4000); // safety margin for raspberry, seemed to be slower
};

exports.test = function() {
	let i = 0;
	let smalltimer = setInterval(() => {
		let val = Math.pow(2, i++);
		console.log('sending ' + val + ', ' + val.toString(16))
		sendCommand(val);
		setTimeout(() => {
			sendCommand(CMD.stop);
		}, 1000);
		if(i > 20) clearInterval(smalltimer);
	}, 1500)
}