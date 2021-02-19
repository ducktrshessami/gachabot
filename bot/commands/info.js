const { Command } = require("discord-bot");
const utils = require("../utils");
const db = require("../../models");

function parseInfo(data) {
    let name = data.unit.aliases.find(alias => alias.primary).name;
    return data.unit.images.map(({ url }, i, foo) => ({
        content: "",
        options: utils.unitEmbed(
            name,
            data.unit.type,
            url
        )
            .setFooter(`${i + 1}/${foo.length}`)
    }));
}

module.exports = new Command("info", function (message, args) {
    let query = args.slice(1).join(" ").trim();
    let queryLower = query.toLowerCase();
    utils.logMessage(message);
    db.alias.findOne({
        where: {
            $and: db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("name")), queryLower)
        },
        include: {
            model: db.unit,
            include: [db.image, db.alias]
        }
    })
        .then(data => {
            if (data) {
                return utils.sendPages(message.channel, parseInfo(data), "⬅️", "➡️", 30000);
            }
            else {
                return utils.sendVerbose(message.channel, `Could not find \`${query}\``);
            }
        })
        .catch(console.error);
}, {
    aliases: ["i"],
    usage: "@gachabot info <unit name>",
    description: "Displays additional info about a unit",
    subtitle: "Can also search by an alias"
});
