const { Command } = require("discord-bot");
const utils = require("../utils");
const db = require("../../models");

module.exports = new Command("wish", function(message, args) {
    let query = args.slice(1).join(" ").trim().toLowerCase();
    utils.logMessage(message);
    db.alias.findOne({
        where: {
            $and: db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("name")), query)
        },
        include: db.unit
    })
        .then(data => utils.sendVerbose(message.channel, JSON.stringify(data)))
        .catch(console.error);
});
