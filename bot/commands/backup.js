const { Command } = require("discord-bot");
const { sendVerbose } = require("../utils");
const { backup } = require("../../db");

module.exports = new Command("backup", function(message) {
    sendVerbose(message.channel, "Backing up the database").catch(console.error);
    backup()
        .then(() => sendVerbose(message.channel, `${message.author} Finished backup`))
        .catch(err => {
            console.log(err);
            sendVerbose(message.channel, `${message.author} Encountered an error backing up the database`).catch(console.error);
        });
}, { admin: true });
