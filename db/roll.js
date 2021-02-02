const db = require("../models");

module.exports = function(n = 1, type) {
    return db.unit.findAll({
        order: db.sequelize.random(),
        limit: n,
        where: type ? { type: type } : undefined,
        include: [db.alias, db.image]
    })
};
