const { Command } = require("discord-bot");
const utils = require("../utils");
const { roll } = require("../../db");
const db = require("../../models");

function showUnit(unit, owner) {
    let primary = unit.aliases.find(alias => alias.primary);
    if (primary) {
        let embed = utils.unitEmbed(primary.name, unit.type, unit.images[0].url);
        if (owner) {
            embed.setFooter(`Belongs to ${owner}`);
        }
        return embed;
    }
}

function checkId(model, id) {
    return model.findByPk(id)
        .then(response => {
            if (!response) {
                return model.create({ id: id });
            }
        });
}

function handleClaim(guild, player, alias) {
    return Promise.all([
        checkId(db.guild, guild),
        checkId(db.player, player)
    ])
        .then(() => db.claim.create({
            guildId: guild,
            playerId: player,
            aliasId: alias
        }));
}

module.exports = new Command("roll", function(message) {
    let unit, alias;
    let claimed = false;
    utils.logMessage(message);
    roll()
        .then(data => {
            unit = data[0];
            let primary = unit.aliases.find(alias => alias.primary);
            if (primary) {
                alias = primary;
            }
        })
        .then(() => showUnit(unit))
        .then(embed => utils.sendVerbose(message.channel, "", embed))
        .then(response => utils.reactButtons(response, [{
            emoji: "❤",
            callback: (reaction, user) => {
                if (!claimed && user.id == message.author.id) {
                    claimed = true;
                    handleClaim(message.guild.id, user.id, alias.id)
                        .then(() => showUnit(unit, user.username))
                        .then(embed => response.edit("", embed));
                }
            }
        }], 60000))
        .catch(console.error);
}, {

});
