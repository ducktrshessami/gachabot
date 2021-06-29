const { MessageEmbed } = require("discord.js");

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

module.exports = unitEmbed;
