# node-rocketlauncher

A very raw USB rocket launcher control for NodeJS.

USB Interface ideas from [https://github.com/kostmo/pyrocket](https://github.com/kostmo/pyrocket)



## Installation

> **Please note the section below the "Simple Installation" instructions for additional requirements to the RaspberryPi setup!**



### Prerequisites

1. USB Library & Build tools for required packages.

	Depending on your platform you require the build tools to compile certain code from the NPM repository. You will know it if the "Simple Installation beow" fails. On Ubuntu this is as easy as:

		sudo apt-get install build-essential libudev-dev gstreamer1.0-tools



2. 2015's latest NodeJS (v5.5.0) & NPM (v3.5.3)
	
	I recommend to use the package [`n`](https://www.npmjs.com/package/n) from the NPM (`sudo npm install -g n`) which comes in handy to maintain different nodejs versions and also for easy updating. I usually do:

		sudo n latest				# Installs latest NodeJS
		sudo npm install -g npm		# Installs latest NPM corresponding to that NodeJS version



### Simple Installation

	npm install 		# (I had to execute twice. after first time there was an error!?)



### Additional Tricky Stuff for the RaspberryPi

Things can be different on a raspberry. This section only covers what I found not working.


#### Power Supply

Since a shipped raspberry doesn't provide enough power for firing the missiles, you need to either use a powered USB Hub or tune your raspberry conf:
Add `max_usb_current=1` to `/boot/config.txt` and reboot. Make sure you have a big enough power supply (>1000mAh).


#### GCC-4.7

This section is only required if you have troubles when trying to install the required packages.
Check your gcc version `gcc -v`. If the output is lower than 4.7 you likely need to take measures such as these:

	sudo apt-get install g++-4.7
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.6 
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.7 40 --slave /usr/bin/g++ g++ /usr/bin/g++-4.7 
	sudo update-alternatives --config gcc



## Usage

Beware: Requires sudo to claim USB interfaces!

	sudo nodejs index.js

