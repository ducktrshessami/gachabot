const DiscordBot = require("discord-bot");
const config = require("../config/discord.json");
const commands = require("./commands");

var client;

// Use .env for token and developer ID
require("dotenv").config();
config.token = process.env.BOT_TOKEN;
config.admin.push(process.env.BOT_DEVID);

client = new DiscordBot(config, commands);

client.on("ready", function() {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.on("shardDisconnect", function() {
    console.log("Logged off");
    process.exit();
});

module.exports = client;
