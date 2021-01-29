'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.player.belongsToMany(models.guild, { through: models.claim });
      models.player.belongsToMany(models.guild, { through: models.wish });
    }
  };
  player.init({
    snowflake: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};
