const { Command } = require("discord-bot");
const { sendVerbose } = require("../utils");

module.exports = new Command("restart", function (message) {
    sendVerbose(message.channel, "Restarting")
        .then(() => this.client.destroy())
        .catch(() => this.client.destroy());
}, {
    admin: true,
    usage: "@gachabot restart",
    description: "Logs out to let an external script restart the bot",
    subtitle: "Botmin only"
});
