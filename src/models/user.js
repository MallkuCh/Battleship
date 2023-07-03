const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'mail must be an email format' },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (!(value.match(/[a-z]/)) || !(value.match(/[0-9]/))) {
            throw new Error('The password must countain at least a letter and a number');
          }
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: { msg: 'Username must be alphanumeric' },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
