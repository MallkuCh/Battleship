module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Users', [
    {
      username: 'Juancagp',
      password: 'abcdefg678',
      mail: 'juan@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'VichoRules',
      password: 'abcdefgh87',
      mail: 'vicentereglas@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'GaboRed',
      password: 'kiraakira123',
      mail: 'gabo@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'MagdaFlower',
      password: 'Flowers123',
      mail: 'maguds@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'drako123',
      password: 'drako123',
      mail: 'drako@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'tobi123',
      password: 'tobi123',
      mail: 'tobi@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (QueryInterface) => QueryInterface.bulkDelete('Users', null, {}),
};
