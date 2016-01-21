/*jshint node:true */

/**
 * Compat for changes from node 0.4.x to 0.6.x.
 */

var os = require('os');
var canvas;
switch (os.platform()) {
  case 'darwin': canvas = require('../binlib/canvas_osx'); break;
  case 'win32': canvas = require('../binlib/canvas'); break; // will automatically load 64 bit, because names are the same
  case 'linux':
    var arch = os.arch();
    if (arch === "ia32") canvas = require('../binlib/canvas_linux');
    if (arch === "x64") canvas = require('../binlib/canvas_linux_x64');
    break;
  default:
    console.log("Unsupported platform");
    process.exit(1);
}
