const { Model } = require('sequelize');

class borrow extends Model {}

module.exports = (sequelize, DataTypes) => {
    borrow.init({
        brw_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brw_bok_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        brw_mbr_code: {
            type: DataTypes.CHAR(4),
            allowNull: false,
        },
        brw_borrowdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        brw_returndate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, {
        modelName: 'borrow',
        freezeTableName: true,
        timestamps: false,
        sequelize,
    });

    return borrow;
};
