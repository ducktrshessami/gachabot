const { MessageEmbed } = require("discord.js");

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
Generate a message embed given a unit's info
@param name: String
@param type: String
@param image: String
@param color: ColorResolvable
@return MessageEmbed
*/
function unitEmbed(name, type, image, color = "RANDOM") {
    return new MessageEmbed({
        color: color,
        title: name,
        description: type
    })
        .setImage(image);
}

/*
sendVerbose a message and set up handling for reacts to change the message content
@param channel: TextBasedChannel
@param pages: Object {
    content: String
    options: MessageOptions | MessageAddition
}
@param wrap: Boolean
@return Promise<Message>
*/
function sendPages(channel, pages, wrap = true) {
    let i = 0;
    let messageContent = pages[i];
    return sendVerbose(channel, messageContent.content ? messageContent.content : "", messageContent.options)
}

module.exports = {
    logMessage: logMessage,
    sendVerbose: sendVerbose,
    unitEmbed: unitEmbed
};
