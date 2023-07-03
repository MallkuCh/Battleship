const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Player, {
      //   foreignKey: 'firstplayer_Id',
      // });
      // this.belongsTo(models.Player, {
      //   foreignKey: 'secondplayer_Id',
      // });
      // this.belongsTo(models.Player, {
      //   foreignKey: 'thirdplayer_Id',
      // });
      // this.belongsTo(models.Game, {
      //   foreignKey: 'game_Id',
      // });
      // this.hasMany(models.Ship, {
      //   foreignKey: 'id',
      // });
      // this.hasMany(models.Coin, {
      //   foreignKey: 'id',
      // });
    }
  }
  Board.init({
    firstplayer_Id: DataTypes.INTEGER,
    secondplayer_Id: DataTypes.INTEGER,
    thirdplayer_Id: DataTypes.INTEGER,
    long: DataTypes.INTEGER,
    broad: DataTypes.INTEGER,
    game_Id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
