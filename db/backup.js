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

// Inner up seeder template
function seedUp(table, data) {
    return `await queryInterface.bulkInsert("${table}", ${data});`;
}

// Inner down seeder template
function seedDown(table) {
    return `await queryInterface.bulkDelete("${table}");`;
}

// Remove the timezone indicator from timestamps
function formatTableData(tableData) {
    return JSON.stringify(tableData.map(row => {
        let data = row.dataValues;
        for (let column in data) {
            if (data[column] instanceof Date) {
                data[column] = data[column].toISOString().slice(0, -1);
            }
        }
        return data;
    }), null, 4);
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
                        up.push(seedUp(table, formatTableData(tableData)));
                        down.push(seedDown(table));
                    }
                });
        })
    )
        .then(() => initSeeders())
        .then(() => seedWrap(up.join("\n"), down.join("\n")))
        .then(seedContent => fs.promises.writeFile(filepath(), seedContent));
};
