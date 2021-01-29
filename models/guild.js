'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.guild.belongsToMany(models.player, { through: models.claim });
      models.guild.belongsToMany(models.player, { through: models.wish });
    }
  };
  guild.init({
    snowflake: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'guild',
  });
  return guild;
};
