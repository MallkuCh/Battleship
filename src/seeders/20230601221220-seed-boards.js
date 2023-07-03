module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Boards', [
    {
      firstplayer_Id: 1,
      secondplayer_Id: 2,
      thirdplayer_Id: 3,
      long: 15,
      broad: 15,
      game_Id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (QueryInterface) => QueryInterface.bulkDelete('Users', null, {}),
};
