'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.image.belongsTo(models.unit, {
        onDelete: "set null",
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  image.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};