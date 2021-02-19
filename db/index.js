const fs = require("fs");
const path = require("path");

var utils = {};

fs
    .readdirSync(__dirname)
    .filter(file => (
        (file.indexOf('.') !== 0) &&
        (file !== path.basename(__filename)) &&
        (file.slice(-3) === '.js')
    ))
    .forEach(file => {
        let name = file.slice(0, -3);
        utils[name] = require(path.join(__dirname, file));
    });

module.exports = utils;
