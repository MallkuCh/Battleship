const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
      // this.hasMany(models.Board, {
      //   foreignKey: 'id',
      // });
    }
  }
  Game.init({
    turn: DataTypes.INTEGER,
    winner: DataTypes.BOOLEAN,
    numPlayers: DataTypes.INTEGER,
    firstplayer_Id: DataTypes.INTEGER,
    secondplayer_Id: DataTypes.INTEGER,
    thirdplayer_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
