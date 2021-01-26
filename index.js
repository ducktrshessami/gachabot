const db = require("./models");

// Only start everything if the database is functional
db.sequelize.sync({ force: true })
    .then(() => {
        process.bot = require("./bot");
        process.input = require("./console");
    })
    .catch(sumTingWong);

/*
Close everything
*/
function sumTingWong(error) {
    if (error) {
        console.error(error);
    }
    if (process.bot) {
        process.bot.destroy();
    }
    if (process.input) {
        process.input.close();
    }
    db.sequelize.close();
}
