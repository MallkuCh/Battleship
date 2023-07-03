module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Players', [
    {
      name: 'juancagp',
      user_Id: 1,
      game_Id: 1,
      puntaje: 0,
      energia: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'vichorules',
      user_Id: 2,
      game_Id: 1,
      puntaje: 8,
      energia: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'GaboRed',
      user_Id: 3,
      game_Id: 1,
      puntaje: 0,
      energia: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (QueryInterface) => QueryInterface.bulkDelete('Users', null, {}),
};
