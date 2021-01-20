'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.unit.hasMany(models.image, { onDelete: "cascade" });
      models.unit.hasMany(models.alias, { onDelete: "cascade" });
    }
  };
  unit.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'unit',
  });
  return unit;
};
