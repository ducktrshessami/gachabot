const { Command } = require("discord-bot");
const utils = require("../utils");
const { roll } = require("../../db");

function showUnit(unit) {
    let primary = unit.aliases.find(alias => alias.primary);
    if (primary) {
        return utils.unitEmbed(primary.name, unit.type, unit.images[0].url);
    }
}

module.exports = new Command("roll", function(message) {
    utils.logMessage(message);
    roll()
        .then(data => data[0])
        .then(showUnit)
        .then(embed => utils.sendVerbose(message.channel, "", embed))
        .catch(console.error);
}, {

});
