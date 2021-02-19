const { Command } = require("discord-bot");

module.exports = new Command("remove", function(message, args) {

}, {
    aliases: ["r"],
    usage: "@gachabot remove <unit name>",
    description: "Remove a claimed unit from your list",
    subtitle: "Can also remove a unit by an alias"
});
