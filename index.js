var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var isLin = /^linux/.test(process.platform);
var screencap = "";
if (isWin) screencap = require('./lib/screencap-windows.js');
if (isLin) screencap = require('./lib/screencap-linux.js');
if (isMac) screencap = require('./lib/screencap-mac.js');
module.exports = screencap;