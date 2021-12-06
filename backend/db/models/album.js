'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    albumName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // songId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Album.associate = function (models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' })
    Album.belongsTo(models.Artist, { foreignKey: 'artistId' })
    Album.hasMany(models.Song, { foreignKey: 'albumId' })
  };
  return Album;
};
