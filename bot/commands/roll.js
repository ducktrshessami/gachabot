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
                    db.claim.create({
                        guildId: message.guild.id,
                        playerId: user.id,
                        aliasId: alias.id
                    })
                        .then(() => showClaimed(unit, user.username))
                        .then(embed => response.edit("", embed));
                }
            }
        }], 60000))
        .catch(console.error);
}, {

});
