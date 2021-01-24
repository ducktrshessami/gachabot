const db = require("./models");

var bot, ios;

// Only start everything if the database is functional
db.sequelize.sync()
    .then(() => {
        bot = require("./bot");
        ios = require("./console");
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
    if (ios) {
        ios.close();
    }
    db.sequelize.close();
}
