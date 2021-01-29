'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.wish.belongsTo(models.unit, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  wish.init({}, {
    sequelize,
    modelName: 'wish',
  });
  return wish;
};
