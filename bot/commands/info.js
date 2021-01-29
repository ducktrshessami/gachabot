const { Command } = require("discord-bot");
const utils = require("../utils");
const db = require("../../models");

module.exports = new Command("info", function(message, args) {
    let query = args.slice(1).join(" ").trim();
    let queryLower = query.toLowerCase();
    utils.logMessage(message);
    db.alias.findOne({
        where: {
            $and: db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("name")), queryLower)
        },
        include: {
            model: db.unit,
            include: db.image
        }
    })
        .then(data => data ? ["", utils.unitEmbed(data.name, data.unit.type, data.unit.images[0].url)] : [`Could not find \`${query}\``])
        .then(response => utils.sendVerbose(message.channel, ...response))
        .catch(console.error);
}, {
    aliases: ["i"]
});
