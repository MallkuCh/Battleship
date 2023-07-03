const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'player_Id',
      });
    }
  }
  Ship.init({
    alive: DataTypes.BOOLEAN,
    pos_x: {
      type: DataTypes.INTEGER,
      validate: {
        isValidPosition(value) {
          if (value < 0 || value > 7) {
            throw new Error('Must be valid position');
          }
        },
      },
    },
    pos_y: {
      type: DataTypes.INTEGER,
      validate: {
        isValidPosition(value) {
          if (value < 0 || value > 7) {
            throw new Error('Must be valid position');
          }
        },
      },
    },
    player_Id: DataTypes.INTEGER,
    game_Id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ship',
  });
  return Ship;
};
