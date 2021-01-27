const DiscordBot = require("discord-bot");
const config = require("../config/discord.json");
const commands = require("./commands");

var client;

// Use defined environment vars for token and developer ID
config.token = process.env.BOT_TOKEN;
config.admin.push(process.env.DUCK_ID);
config.admin.push(process.env.TILL_ID);

client = new DiscordBot(config, commands);

client.on("ready", function() {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.on("shardDisconnect", function() {
    console.log("Logged off");
    process.exit();
});

module.exports = client;
