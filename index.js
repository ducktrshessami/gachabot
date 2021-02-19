try {
    require("dotenv").config();
}
catch {
    console.info("Not using dotenv. Make sure all environment variables are set.");
}

const db = require("./models");

// Only start everything if the database is functional
db.sequelize.sync()
    .then(() => {
        process.bot = require("./bot");
        process.input = require("./console");
    })
    .catch(startupError);

/*
Close everything
*/
function startupError(error) {
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
