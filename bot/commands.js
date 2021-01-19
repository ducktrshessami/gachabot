const { Command } = require("discord-bot");
const db = require("../models");

/*
Log a message
@param message: Message
*/
function logMessage(message) {
    let source = message.guild ? `${message.guild.id}/${message.channel.id}` : message.channel.id;
    console.log(`[${source}] ${message.author.username}#${message.author.discriminator}: ${message.content}`);
    return message;
}

/*
Send a message to a TextChannel and log it
@param channel: TextBasedChannel
@param content: String
@param options: MessageOptions | MessageAddition
@return Promise<Message>
*/
function sendVerbose(channel, content, options) {
    return channel.send(content, options)
        .then(logMessage)
}

/*
Create Command list
*/
module.exports = [
    new Command("restart", function(message) {
        sendVerbose(message.channel, "Restarting")
            .then(() => this.client.destroy())
            .catch(() => this.client.destroy());
    }, { admin: true })
];
