const fs = require("fs");
const path = require("path");
const { createInterface } = require("readline");

var is = createInterface({ input: process.stdin });
var commands = {};

// Handle every other file in this dir as a command
fs
    .readdirSync(__dirname)
    .filter(file => (
        (file.indexOf('.') !== 0) &&
        (file !== path.basename(__filename)) &&
        (file.slice(-3) === '.js')
    ))
    .map(file => file.slice(0, -3).toLowerCase())
    .forEach(file => commands[file] = require(path.join(__dirname, file)));

// Handle input
is.on("line", line => {
    let cmd = line.trim().toLowerCase();
    if (commands[cmd]) {
        commands[cmd]();
    }
    else {
        console.log(`'${line.trim()}' not recognized`);
    }
});

module.exports = is;
