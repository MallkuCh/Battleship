module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Games', [
    {
      turn: 1,
      winner: false,
      numPlayers: 3,
      firstplayer_Id:1,
      secondplayer_Id:2,
      thirdplayer_Id:3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  
  ]),
  down: (QueryInterface) => QueryInterface.bulkDelete('Users', null, {}),
};
