const { Command } = require("discord-bot");
const { sendVerbose } = require("../utils");
const backup = require("../../db/backup");

module.exports = new Command("backup", function(message) {
    sendVerbose(message.channel, "Backing up the database").catch(console.error);
    backup();
    sendVerbose(message.channel, `${message.author} Finished backup`).catch(console.error);
}, { admin: true });
