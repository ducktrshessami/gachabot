const path = require("path");
const fs = require("fs");
const db = require("../models");
const { rejects } = require("assert");
const { table } = require("console");

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
    return path.join(__dirname, "..", "seeders", `${date.getUTCFullYear()}${extend.join("")}-backup.js`);
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
    return new Promise((resolve, reject) => {
        let up = [], down = [];
        Promise.all(Object.keys(db)
            .filter(key => key.toLowerCase() != "sequelize")
            .map(model => db[model].findAll()
                .then(table => JSON.stringify(table, null, 4))
                .then(tableData => up.push(seedUp(model, tableData)))
                .then(() => down.push(seedDown(model)))
            )
        )
            .then(() => seedWrap(up.join("\n"), down.join("\n")))
            .then(console.log);
    });
};
