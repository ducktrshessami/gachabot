const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-bot");
const db = require("../../models");
const utils = require("../utils");

function generateList(username, data, color = "RANDOM", perPage = 15) {
    let pages = [];
    if (data) {
        for (let i = 0; i < data.length; i += perPage) {
            pages.push({
                content: "",
                options: new MessageEmbed({
                    color: color,
                    title: `${username}'s list`,
                    description: data
                        .slice(i, i + perPage)
                        .map(claim => claim.alias.name)
                        .join("\n")
                })
            });
        }
    }
    return pages;
}

function getUnits(player, guild) {
    return db.guild.findOne({
        attributes: ["id"],
        where: { id: guild }
    })
        .then(guildData => guildData ? db.player.findOne({
            where: { id: player },
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
        .then(player => player ? player.claims : []);
}

module.exports = new Command("list", function(message, args) {
    let snowflake = message.author.id;
    utils.logMessage(message);
    if (args[1] && args[1] === args[1].match(/<@[0-9]+>|<@\![0-9]+>/)[0]) {
        snowflake = args[1].match(/[0-9]+/)[0];
    }
    getUnits(snowflake, message.guild.id)
        .then(data => generateList(message.author.username, data))
        .then(pages => {
            switch (pages.length) {
                default: return utils.sendPages(message.channel, pages, "⬅️", "➡️", 30000);
                case 1: return utils.sendVerbose(message.channel, pages[0].content, pages[0].options);
                case 0: return utils.sendVerbose(message.channel, "", new MessageEmbed({
                    color: "RANDOM",
                    title: `${message.author.username}'s list`,
                    description: "(No result)"
                }));
            }
        })
        .catch(console.error);
}, {

});
