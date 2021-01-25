const backup = require("../db/backup");

module.exports = function() {
    console.log("Creating seeders for all models . . .");
    backup();
    console.log("Done");
};
