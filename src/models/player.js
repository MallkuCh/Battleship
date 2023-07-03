const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_Id',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'game_Id',
      });
      // this.hasOne(models.Board, {
      //   foreignKey: 'id',
      // });
      this.hasMany(models.Ship, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: { msg: 'Username must be alphanumeric' },
      },
    },
    user_Id: DataTypes.INTEGER,
    game_Id: DataTypes.INTEGER,
    puntaje: DataTypes.INTEGER,
    energia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
