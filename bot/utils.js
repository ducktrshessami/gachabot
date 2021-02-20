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
Handle message react buttons
@param message: Message
@param reactHandlers: Array<Object> {
    emoji: EmojiIdentifierResolvable,
    callback: function
}
@param ms: Number
*/
async function reactButtons(message, reactHandlers, ms) {
    let timer;
    let { client } = message;
    let resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(timeout, ms);
    };
    let timeout = () => {
        client.off("messageReactionAdd", handlerWrapper);
        client.off("messageReactionRemove", handlerWrapper);
    };
    let handlerWrapper = async (reaction, user) => {
        if (!reaction.me) {
            let handler = reactHandlers.find(handler => reaction.emoji.toString().includes(handler.emoji.toString()));
            if (handler) {
                await handler.callback(reaction, user);
                resetTimer();
            }
        }
    };
    client.on("messageReactionAdd", handlerWrapper);
    client.on("messageReactionRemove", handlerWrapper);
    timer = setTimeout(timeout, ms);
    for (let i = 0; i < reactHandlers.length; i++) {
        await message.react(reactHandlers[i].emoji);
    }
    return message;
}

/*
sendVerbose a message and set up handling for reacts to change the message content
@param channel: TextBasedChannel
@param pages: Object {
    content: String
    options: MessageOptions | MessageAddition
}
@param left: EmojiIdentifierResolvable
@param right: EmojiIdentifierResolvable
@param ms: Number
@return Promise<Message>
*/
function sendPages(channel, pages, left, right, ms) {
    let timer;
    let i = 0;
    return sendVerbose(channel, pages[i].content ? pages[i].content : "", pages[i].options)
        .then(message => reactButtons(message, [
            {
                emoji: left,
                callback: () => {
                    if (--i < 0) {
                        i = pages.length - 1;
                    }
                    message.edit(pages[i].content ? pages[i].content : "", pages[i].options);
                }
            },
            {
                emoji: right,
                callback: () => {
                    if (++i >= pages.length) {
                        i = 0;
                    }
                    message.edit(pages[i].content ? pages[i].content : "", pages[i].options);
                }
            }
        ], ms));
}

function awaitResponse() {
    
}

module.exports = {
    logMessage: logMessage,
    sendVerbose: sendVerbose,
    unitEmbed: unitEmbed,
    sendPages: sendPages,
    reactButtons: reactButtons
};
