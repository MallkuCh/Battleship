const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Board, {
      //   foreignKey: 'board_Id',
      // });
    }
  }
  Coin.init({
    in_table: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER,
    type: DataTypes.STRING,
    pos_x: DataTypes.INTEGER,
    pos_y: DataTypes.INTEGER,
    game_Id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Coin',
  });
  return Coin;
};
