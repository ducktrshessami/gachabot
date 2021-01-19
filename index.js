const db = require("./models");
var bot;

db.sequelize.sync()
    .then(() => bot = require("./bot"))
    .catch(console.error);
