'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    songName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    songLink: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Song.associate = function (models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.belongsTo(models.Album, { foreignKey: 'albumId' })
    Song.belongsTo(models.Artist, { foreignKey: 'artistId' })
  };
  return Song;
};
