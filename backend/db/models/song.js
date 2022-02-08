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
    albumImage: {
      type: DataTypes.STRING(20000),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Song.associate = function (models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE' })
  };
  return Song;
};
