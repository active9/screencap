var screencap = require('../index.js');

var screen = screencap({
		videoCodec: "libx264",
		videoBitrate: "1000k",
		audioBitrate: "96k"
	},'test.mp4');
screen.capture('30');