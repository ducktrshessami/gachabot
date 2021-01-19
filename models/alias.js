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
      models.alias.belongsTo(models.unit, {
        onDelete: "set null",
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  alias.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spoiler: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'alias',
  });
  return alias;
};