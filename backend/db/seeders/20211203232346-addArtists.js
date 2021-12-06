'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Artists', [
      {
        artistName: 'H.1',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'S N U G',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'Blue Wednesday',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'No Spirit',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'Laffey',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'Osaki',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'Yasumu',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: 'Raimu',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
