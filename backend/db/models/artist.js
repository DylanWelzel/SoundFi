'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artistName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Artist.associate = function (models) {
    Artist.belongsTo(models.User, { foreignKey: 'userId' })
    Artist.hasMany(models.Album, { foreignKey: 'artistId' })
    Artist.hasMany(models.Song, { foreignKey: 'artistId' })
  };
  return Artist;
};
