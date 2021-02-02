const db = require("../models");

module.exports = function(n = 1, type) {
    db.unit.findAll({
        order: db.sequelize.random(),
        limit: n,
        where: { type: type },
        include: {
            model: db.alias,
            include: db.image
        }
    })
};
