var os = require('os');
var util = require('util');
var cp = require('child_process');

var platform = os.platform();
var arch = os.arch();
var rawNodeVersion = process.versions.node.split(".");
var nodeVersion = rawNodeVersion[0] + "." + rawNodeVersion[1];

if (["linux", "darwin", "win32"].indexOf(platform) === -1) {
  throw new Error("We didn't recognize the platform you are on and consequently cannot install the right binary files!");
}

if (["ia32","x64"].indexOf(arch) === -1) {
  throw new Error("We didn't recognize the architecture you are on and consequently cannot install the right binary files!");
}

util.log("NodeCanvasBin: Installing precompiled binaries for " + platform + "/" + arch);

var baseUrl = "git://github.com/mauritslamers/node-canvas-bin-libs#";
if (platform === "linux") {
  baseUrl += ((arch === "x64") ? "linux-x86_64" : "linux-ia32");
}
else if (platform === "darwin") {
  baseUrl += "osx";
}
else baseUrl += platform;

baseUrl += "_" + nodeVersion;

var proc = cp.spawn("npm", ["install", baseUrl]);
proc.stdout.on('data', function (d) {
  console.log(d.toString());
});
proc.stderr.on('data', function (d) {
  console.log(d.toString());
});
