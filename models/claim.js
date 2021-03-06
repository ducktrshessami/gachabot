'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.claim.belongsTo(models.guild, {
        foreignKey: {
          allowNull: false
        }
      });
      models.claim.belongsTo(models.player, {
        foreignKey: {
          allowNull: false
        }
      });
      models.claim.belongsTo(models.alias, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  claim.init({}, {
    sequelize,
    modelName: 'claim',
  });
  return claim;
};
