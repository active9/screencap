var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var fs = require('fs');

function screencap(options,fileout) {
	self = this;
	if (typeof fileout == "undefined") { fileout = false; }
	if (typeof options == "undefined") { options = {}; }
	if (typeof options.videoCodec == "undefined") { options.videoCodec = false; }
	if (typeof options.videoBitrate == "undefined") { options.videoBitrate = false; }
	if (typeof options.audioBitrate == "undefined") { options.audioBitrate = false; }
	this.videoCodec = options.videoCodec || "libx264";
	this.videoBitrate = options.videoBitrate || "1000k";
	this.audioBitrate = options.audioBitrate || "96k";
	if (fileout) {
	        this.file = path.resolve(""+ fileout +"");
	} else {
		this.file = null;
	}
	this.capture = function(duration) {
		console.log("Starting Screen Capture: Duration ", duration, " seconds");
		console.log("Screen Capture Output: ", this.file);
		console.log("Press Ctrl+C To Abort The Capture");
		ffmpeg()
		.videoCodec(this.videoCodec)
		.videoBitrate(this.videoBitrate)
		.audioBitrate(this.audioBitrate)
		.addOptions([
			"-movflags frag_keyframe+faststart",
			"-preset ultrafast",
			"-tune zerolatency",
			"-threads 0",
			"-async 1"
		])
		.input('video=screen-capture-recorder')
		.inputOptions([
			'-t '+ duration +'',
			'-f dshow'
		])
		.on('end', function() {
			console.log('Screen Capture Completed.');
		})
		.save(this.file)
		.on('error', function(e) {
			console.log("ERROR:",e);
		});
	};
	this.gif = function(height,duration) {
		console.log("Starting Screen Recording: Duration ", duration, " seconds");
		console.log("Screen Recording Output: ", this.file);
		console.log("Press Ctrl+C To Abort The Recording");
		ffmpeg()
		.addOptions([
			"-pix_fmt rgb24",
			'-filter:v scale=-1:'+ height
		])
		.fps(3)
		.input('video=screen-capture-recorder')
		.inputOptions([
			'-t '+ duration +'',
			'-f dshow'
		])
		.on('end', function() {
			console.log('Screen Recording Complete.');
		})
		.save(this.file)
		.on('error', function(e) {
			console.log("ERROR:",e);
		});
	};
	this.shot = function() {
		console.log("Starting Screen Shot");
		console.log("Saving To: ", this.file);
		ffmpeg()
		.videoBitrate(this.videoBitrate)
		.audioBitrate(this.audioBitrate)
		.duration('0.1')
		.input('video=screen-capture-recorder')
		.inputOptions([
			'-f dshow'
		])
		.on('end', function() {
			console.log('file has been converted succesfully');
		})
		.save(this.file)
		.on('error', function(e) {
			// Supress Errors
		});
	};
	this.capturePipe = function(duration,res) {
		console.log("Starting Screen Capture: Duration ", duration, " seconds");
		console.log("Screen Capture Piped");
		console.log("Press Ctrl+C To Abort The Capture");
		ffmpeg()
		.videoCodec(this.videoCodec)
		.videoBitrate(this.videoBitrate)
		.audioBitrate(this.audioBitrate)
		.addOptions([
			"-movflags frag_keyframe+faststart",
			"-preset ultrafast",
			"-tune zerolatency",
			"-threads 0",
			"-async 1"
		])
		.input('video=screen-capture-recorder')
		.inputOptions([
			'-t '+ duration +'',
			'-f dshow'
		])
		.on('end', function() {
		  console.log('file has been converted succesfully');
		})
		.on('error', function(err) {
		  console.log('an error happened: ' + err.message);
		})
		.pipe(res, {end:true});
	};
	this.shotPipe = function(res) {
		console.log("Starting Screen Shot");
		console.log("Piping");
		ffmpeg()
		.videoBitrate(this.videoBitrate)
		.audioBitrate(this.audioBitrate)
		.duration('0.1')
		.input('video=screen-capture-recorder')
		.inputOptions([
			'-f dshow'
		])
		.on('end', function() {
		  console.log('file has been converted succesfully');
		})
		.on('error', function(err) {
		  console.log('an error happened: ' + err.message);
		})
		.pipe(res, {end:true});
	};

	return this;

}

module.exports = screencap;