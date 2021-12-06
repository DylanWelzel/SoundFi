'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Albums', [
      {
        albumName: 'Indigo Night',
        artistId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'Purple Skies',
        artistId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'In My Head',
        artistId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'Happy Moments',
        artistId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'After The Rain',
        artistId: 5,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'New Beginnings',
        artistId: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'Creating Memories',
        artistId: 7,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        albumName: 'Meditative Flow',
        artistId: 8,
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
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
