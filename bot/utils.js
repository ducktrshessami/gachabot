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
function sendPages(channel, pages, left, right, ms) {
    let timer;
    let i = 0;
    return sendVerbose(channel, pages[i].content ? pages[i].content : "", pages[i].options)
        .then(message => new Promise(async (resolve, reject) => {
            let { client } = message;
            let resetTimer = () => {
                clearTimeout(timer);
                timer = setTimeout(timeout, ms);
            };
            let handler = ({ emoji }) => {
                if (emoji.toString() === left.toString()) {
                    if (--i < 0) {
                        i = pages.length - 1;
                    }
                }
                else if (emoji.toString() === right.toString()) {
                    if (++i >= pages.length) {
                        i = 0;
                    }
                }
                else {
                    return;
                }
                message.edit(pages[i].content ? pages[i].content : "", pages[i].options)
                    .then(resetTimer)
                    .catch(reject);
            };
            let timeout = () => {
                client.off("messageReactionAdd", handler);
                client.off("messageReactionRemove", handler);
                resolve(message);
            };
            await message.react(left);
            await message.react(right);
            client.on("messageReactionAdd", handler);
            client.on("messageReactionRemove", handler);
        }));
}

module.exports = {
    logMessage: logMessage,
    sendVerbose: sendVerbose,
    unitEmbed: unitEmbed,
    sendPages: sendPages
};
