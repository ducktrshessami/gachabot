const { Command } = require("discord-bot");
const utils = require("../utils");
const db = require("../../models");

module.exports = new Command("wish", function(message, args) {
    let query = args.slice(1).join(" ").trim().toLowerCase();
    utils.logMessage(message);
    db.alias.findOne({
        where: {
            $and: Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), query)
        },
        include: db.unit
    })
        .then(data => utils.sendVerbose(message.channel, JSON.stringify))
        .catch(console.error);
});
