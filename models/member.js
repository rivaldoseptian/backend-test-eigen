const { Model } = require('sequelize');

class member extends Model {}

module.exports = (sequelize, DataTypes) => {
    member.init({
        mbr_code: {
            type: DataTypes.CHAR(4),
            allowNull: false,
        },
        mbr_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        mbr_haspenalized: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, {
        modelName: 'member',
        freezeTableName: true,
        timestamps: false,
        sequelize,
    });

    return member;
};
