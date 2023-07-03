/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      in_table: {
        type: Sequelize.BOOLEAN,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      pos_x: {
        type: Sequelize.INTEGER,
        max: 7,
        min: 0,
      },
      pos_y: {
        type: Sequelize.INTEGER,
        max: 7,
        min: 0,
      },
      game_Id: {
        type: Sequelize.INTEGER,
        // references: { model: 'Boards', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Coins');
  },
};
