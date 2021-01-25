const path = require("path");
const db = require("../models");

// Numbers, but fixed to 2 digits
function extendo(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

// Generate a seeder filename
function filepath() {
    let date = new Date();
    let extend = [
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours() + 1,
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ].map(extendo);
    return path.join(__dirname, "..", "seeders", `${date.getUTCFullYear()}${extend.join("")}-backup.js`);
}

module.exports = function() {
    for (let model in Object.keys(db)) {
        if (model.toLowerCase() != "sequelize") {
            
        }
    }
};
