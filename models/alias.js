'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  alias.init({
    name: DataTypes.STRING,
    spoiler: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'alias',
  });
  return alias;
};