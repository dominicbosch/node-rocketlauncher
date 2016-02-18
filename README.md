# node-rocketlauncher

A very raw USB rocket launcher control for NodeJS.

USB Interface ideas from [https://github.com/kostmo/pyrocket](https://github.com/kostmo/pyrocket)

## Installation

### Latest NodeJS, USB library and GCC-4.7

This section is only required if you have troubles when trying to install the required packages in the next section below.
Check your gcc version `gcc -v`. If the output is lower than 4.7 you need to take measures such as these:

	sudo apt-get install g++-4.7
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.6 
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.7 40 --slave /usr/bin/g++ g++ /usr/bin/g++-4.7 
	sudo update-alternatives --config gcc

### Install required packages

	sudo apt-get install build-essential libudev-dev
	npm install 		# (I had to execute twice. after first time there was an error)

## Usage

Beware: Requires sudo to claim USB interfaces!

	sudo nodejs index.js

