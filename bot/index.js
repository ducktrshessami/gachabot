const DiscordBot = require("discord-bot");
const config = require("../config/discord.json");
const commands = require("./commands");

require("dotenv").config();
config.token = process.env.BOT_TOKEN;
config.admin.push(process.env.BOT_DEVID);

module.exports = new DiscordBot(config, commands);
