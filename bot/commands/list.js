const { Command } = require("discord-bot");
const db = require("../../models");

function getUnits(player, guild) {
    return db.guild.findOne({
        attributes: ["id"],
        where: { snowflake: guild }
    })
        .then(guildData => guildData ? db.player.findOne({
            where: { snowflake: player },
            include: {
                model: db.claim,
                where: { guildId: guildData.id },
                include: {
                    model: db.alias,
                    include: db.unit
                },
                order: ["createdAt", "asc"]
            }
        }) : null)
        .then(player => player ? player.claims : null);
}

module.exports = new Command("list", function(message, args) {
    let snowflake = message.author.id;
    if (args[1] && args[1] === args[1].match(/<@[0-9]+>|<@\![0-9]+>/)[0]) {
        snowflake = args[1].match(/[0-9]+/)[0];
    }
    getUnits(snowflake, message.guild.id)
        .catch(console.error);
}, {

});
