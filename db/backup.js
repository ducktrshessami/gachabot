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
function seedUp(table, data) {
    return `await queryInterface.bulkInsert("${table}", ${data});`;
}

function seedDown(table) {
    return `await queryInterface.bulkDelete("${table}");`;
}

module.exports = function() {
    let up = [], down = [];
    return Promise.all(Object.keys(db)
        .filter(key => key.toLowerCase() != "sequelize")
        .map(model => {
            let table = db[model].getTableName();
            return db[model].findAll()
                .then(tableData => {
                    if (tableData.length) {
                        up.push(seedUp(table, JSON.stringify(tableData, null, 4)));
                        down.push(seedDown(table));
                    }
                });
        })
    )
        .then(() => initSeeders())
        .then(() => seedWrap(up.join("\n"), down.join("\n")))
        .then(seedContent => fs.promises.writeFile(filepath(), seedContent));
};
