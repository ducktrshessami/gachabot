const db = require("../models");

module.exports = function(n = 1, type) {
    return db.unit.findAll({
        order: db.sequelize.random(),
        attributes: ["type"],
        limit: n,
        where: type ? { type: type } : undefined,
        include: [
            {
                model: db.alias,
                attributes: ["name", "primary", "spoiler"]
            },
            {
                model: db.image,
                attributes: ["url"]
            }
        ]
    })
};
