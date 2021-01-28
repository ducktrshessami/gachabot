const { resolve, join } = require("path");
const fs = require("fs");
const db = require("../models");

const seeders = resolve(__dirname, "..", "seeders");

// Create the seeders folder if it doesn't exist yet
async function initSeeders() {
    if (!fs.existsSync(seeders)) {
        await fs.promises.mkdir(seeders);
    }
}

// Numbers, but fixed to 2 digits
function extendo(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

// Generate a seeder filename
function filepath() {
    let date = new Date();
    let extend = [
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours() + 1,
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ].map(extendo);
    return join(seeders, `${date.getUTCFullYear()}${extend.join("")}-backup.js`);
}

// Outer seeder template
function seedWrap(up, down) {
    return `'use strict';

    module.exports = {
        up: async (queryInterface, Sequelize) => {
            ${up}
        },
    
        down: async (queryInterface, Sequelize) => {
            ${down}
        }
    };`;
}

//
function seedUp(model, data) {
    return `await queryInterface.bulkInsert("${model}", ${data});`;
}

function seedDown(model) {
    return `await queryInterface.bulkDelete("${model}");`;
}

module.exports = function() {
    let up = [], down = [];
    return Promise.all(Object.keys(db)
        .filter(key => key.toLowerCase() != "sequelize")
        .map(model => db[model].findAll()
            .then(table => JSON.stringify(table, null, 4))
            .then(tableData => up.push(seedUp(model, tableData)))
            .then(() => down.push(seedDown(model)))
        )
    )
        .then(() => initSeeders())
        .then(() => seedWrap(up.join("\n"), down.join("\n")))
        .then(seedContent => fs.promises.writeFile(filepath(), seedContent));
};
