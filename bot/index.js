const DiscordBot = require("discord-bot");
const config = require("../config/discord.json");
const commands = require("./commands");

var client;

client = new DiscordBot(config, commands);

client.on("ready", function () {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.on("shardDisconnect", function () {
    console.log("Logged off");
    process.exit();
});

client.on("error", console.error);

module.exports = client;
