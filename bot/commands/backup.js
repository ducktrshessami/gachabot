const { Command, utils } = require("discord-bot");
const { backup } = require("../../db");

module.exports = new Command("backup", function (message) {
    utils.sendVerbose(message.channel, "Backing up the database").catch(console.error);
    backup()
        .then(() => utils.sendVerbose(message.channel, `${message.author} Finished backup`))
        .catch(err => {
            console.log(err);
            utils.sendVerbose(message.channel, `${message.author} Encountered an error backing up the database`).catch(console.error);
        });
}, {
    admin: true,
    usage: "@gachabot backup",
    description: "Backup the entire database as a Sequelize seeder",
    subtitle: "Botmin only"
});
