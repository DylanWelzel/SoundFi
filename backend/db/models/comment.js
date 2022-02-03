'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, { foreignKey: 'userId' })
    };
    return Comment;
};
