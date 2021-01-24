const db = require("./models");

var bot, is;

// Only start everything if the database is functional
db.sequelize.sync()
    .then(() => {
        bot = require("./bot");
        is = require("./console");
    })
    .catch(sumTingWong);

/*
Close everything
*/
function sumTingWong(error) {
    if (error) {
        console.error(error);
    }
    if (bot) {
        bot.destroy();
    }
    if (is) {
        is.close();
    }
    db.sequelize.close();
}
