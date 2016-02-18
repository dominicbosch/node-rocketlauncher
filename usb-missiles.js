'use strict';

let usb = require('usb');

console.log(usb);

let arrKnownMissiles = [
	// '6465:32801',
	// '2689:1793',
	// '2689:65281',
	// '4400:514',
	'8483:4112'
];

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

function sendCommand(bstr) {
	let b = new Buffer('02'+bstr, 'hex');
	// console.log(b);
	for(let i = 0; i < arrFoundMissiles.length; i++) {
		// controlTransfer(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback(error, data))
		// arrFoundMissiles[i].controlTransfer(0x21, 0x09, b.length, 0x0200, b, function(err, data) {
		arrFoundMissiles[i].controlTransfer(0x21, 0x09, 0, 0, b, function(err, data) {
			if(err && err.errno === usb.LIBUSB_ERROR_NO_DEVICE){
				console.error('DEVICE Hang up! Reconnecting...');
				arrFoundMissiles = getAvailableDevices();
			}
			if(err) console.log('err', err.message);
			// console.log('data', data);
		})
	}
}

exports.stop = function() { sendCommand('00')};
exports.down = function() { sendCommand('01')};
exports.up = function() { sendCommand('02')};
exports.left = function() { sendCommand('04')};
exports.right = function() { sendCommand('08')};
exports.fire = function() { sendCommand('10')};
