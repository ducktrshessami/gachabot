module.exports = function() {
    console.log("Creating seeders for all models . . .");
    require("../db/backup")();
    console.log("Done");
};
