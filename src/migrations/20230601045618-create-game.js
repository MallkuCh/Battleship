/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      turn: {
        type: Sequelize.INTEGER,
      },
      winner: {
        type: Sequelize.BOOLEAN,
      },
      numPlayers: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      firstplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: true,
        // references: { model: 'Players', key: 'id' }
      },
      secondplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: true,
        // references: { model: 'Players', key: 'id' }
      },
      thirdplayer_Id: {
        type: Sequelize.INTEGER,
        // allowNull: true,
        // references: { model: 'Players', key: 'id' }
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
    await queryInterface.dropTable('Games');
  },
};
