const db = require("../models");

module.exports = function (query) {
    let queryLower = query.toLowerCase();
    return db.alias.findOne({
        where: {
            $and: db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("name")), queryLower)
        },
        include: {
            model: db.unit,
            include: [db.image, db.alias]
        }
    });
};
