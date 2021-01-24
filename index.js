const readline = require("readline");
const db = require("./models");
var bot, ios;

db.sequelize.sync()
    .then(() => {
        bot = require("./bot");
        ios = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    })
    .catch(sumTingWong);

function sumTingWong(error) {
    console.error(error);
    if (bot) {
        bot.destroy();
    }
    if (ios) {
        ios.close();
    }
    db.sequelize.close();
}
