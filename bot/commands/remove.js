const { Command, utils } = require("discord-bot");
const db = require("../../models");
const { aliasQuery } = require("../../db");

function findClaim(unitId, playerId, guildId) {
    return db.claim.findOne({
        where: {
            playerId: playerId,
            guildId: guildId,
            "$alias.unitId$": unitId
        },
        include: db.alias
    })
}

module.exports = new Command("remove", function (message, args) {
    let query = args.slice(1).join(" ").trim();
    utils.logMessage(message);
    aliasQuery(query)
        .then(alias => {
            if (alias) {
                return findClaim(alias.unit.id, message.author.id, message.guild.id)
                    .then(claim => {
                        if (claim) {
                            utils.awaitResponse(reply => ["y", "n", "yes", "no"].includes(reply.content.trim().toLowerCase()), 60000, message.channel, `${message.author} Are you sure you want to remove **${alias.name}**? (y/n)`)
                                .then(reply => {
                                    if (reply) {
                                        if (reply.content.toLowerCase().startsWith("y")) {
                                            return claim.destroy()
                                                .then(() => utils.sendVerbose(message.channel, `${message.author} Removed **${alias.name}**`));
                                        }
                                        else {
                                            return utils.sendVerbose(message.channel, `${message.author} Remove cancelled`);
                                        }
                                    }
                                    else {
                                        return utils.sendVerbose(message.channel, `${message.author} `);
                                    }
                                })
                        }
                        else {
                            return utils.sendVerbose(message.channel, `${message.author} **${alias.name}** doesn't belong to you`);
                        }
                    })
            }
            else {
                return utils.sendVerbose(message.channel, `${message.author} Could not find \`${query}\``);
            }
        })
        .catch(console.error);
}, {
    aliases: ["r"],
    usage: "@gachabot remove <unit name>",
    description: "Remove a claimed unit from your list",
    subtitle: "Can also remove a unit by an alias"
});
