const { Command } = require("discord-bot");
const utils = require("../utils");
const db = require("../../models");

module.exports = new Command("info", function(message, args) {
    let query = args.slice(1).join(" ").trim().toLowerCase();
    utils.logMessage(message);
    db.alias.findOne({
        where: {
            $and: db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("name")), query)
        },
        include: {
            model: db.unit,
            include: db.image
        }
    })
        .then(data => utils.sendVerbose(message.channel, "", utils.unitEmbed(data.name, data.unit.type, data.unit.images[0].url)))
        .catch(console.error);
}, { aliases: ["i"] });
