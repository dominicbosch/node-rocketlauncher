var RaspiCam = require("raspicam");

var camera = new RaspiCam({ opts });

//to take a snapshot, start a timelapse or video recording
camera.start( );

//to stop a timelapse or video recording
camera.stop( );

//listen for the "started" event triggered when the start method has been successfully initiated
camera.on("started", function(){ 
	//do stuff
});

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, filename){ 
	//do stuff
});

//listen for the process to exit when the timeout has been reached
camera.on("exited", function(){
	//do stuff
});


// ## TCP streaming:
// On Raspi:
raspivid -t 0 -hf -fps 20 -w 1024 -h 768 -o - | gst-launch-1.0 fdsrc ! h264parse ! rtph264pay config-interval=1 pt=96 ! gdppay ! tcpserversink host=192.168.0.11 port=5000

// On linux:
gst-launch-1.0 -v tcpclientsrc host=192.168.0.11 port=5000  ! gdpdepay !  rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false


// ## MJPEG Streamer:
// http://blog.miguelgrinberg.com/post/stream-video-from-the-raspberry-pi-camera-to-web-browsers-even-on-ios-and-android
// On Raspi:
raspistill --nopreview -w 640 -h 480 -q 5 -o /tmp/stream/pic.jpg -tl 100 -t 9999999 -th 0:0:0  > /dev/null 2>&1 &
LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_file.so -f /tmp/stream -n pic.jpg" -o "output_http.so -w /usr/local/www"

// In any browser:
192.168.0.11:8080


var args = ['--nopreview', '-w', '640', '-h', '480', '-q', '5', '-o', './stream/image_stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0']
