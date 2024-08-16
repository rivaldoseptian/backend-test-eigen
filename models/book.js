const { Model } = require('sequelize');

class book extends Model {}

module.exports = (sequelize, DataTypes) => {
    book.init({
        bok_code: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        bok_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bok_author: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bok_stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        modelName: 'book',
        freezeTableName: true,
        timestamps: false,
        sequelize,
    });

    return book;
};
