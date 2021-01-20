const { Command } = require("discord-bot");
const utils = require("./utils");
const db = require("../models");

/*
Restart Command callback
*/
function restart(message) {
    utils.sendVerbose(message.channel, "Restarting")
        .then(() => this.client.destroy())
        .catch(() => this.client.destroy());
}

/*
Create Command list
*/
module.exports = [
    new Command("restart", restart, { admin: true })
];
