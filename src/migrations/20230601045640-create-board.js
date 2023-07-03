/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references: { model: 'Players', key: 'id' },
      },
      secondplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references: { model: 'Players', key: 'id' },
      },
      thirdplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references: { model: 'Players', key: 'id' },
      },
      long: {
        type: Sequelize.INTEGER,
      },
      broad: {
        type: Sequelize.INTEGER,
      },
      game_Id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Boards');
  },
};
