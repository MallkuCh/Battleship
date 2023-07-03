/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      alive: {
        type: Sequelize.BOOLEAN,
      },
      pos_x: {
        type: Sequelize.INTEGER,
      },
      pos_y: {
        type: Sequelize.INTEGER,
      },
      player_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Players', key: 'id' },
      },
      game_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Games', key: 'id' },
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
    await queryInterface.dropTable('Ships');
  },
};
