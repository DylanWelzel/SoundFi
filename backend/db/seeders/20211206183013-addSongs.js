'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
        return queryInterface.bulkInsert('Songs', [
            {
                songName: 'Floating',
                songLink: 'floating songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Evenings',
                songLink: 'evenings songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Birds Eye View',
                songLink: 'birdseyeview songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Lift Up',
                songLink: 'liftup songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Hope',
                songLink: 'hope songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Wishes',
                songLink: 'wishes songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Perspectives',
                songLink: 'perspectives songlink',
                albumImage: 'floating songlink',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songName: 'Sinking Fatigue',
                songLink: 'sinkingfatigue songlink',
                albumImage: 'floating songlink',
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
        return queryInterface.bulkDelete('Songs', null, {});
    }
};
