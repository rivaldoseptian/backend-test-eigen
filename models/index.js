const { Sequelize, DataTypes, Op } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
    config.DBDatabase,
    config.DBUsername,
    config.DBPassword,
    {
        host:        config.DBHost,
        port:        config.DBPort,
        dialect:     config.DBDialect,
        // dialectOptions: {
        //     useUTC: true,
        // },
        // timezone:    false,
        pool: {
            max:     config.DBPoolMax,
            min:     config.DBPoolMin,
            acquire: config.DBPoolAcquire,
            idle:    config.DBPoolIdle,
        },
    },
);

sequelize.authenticate()
    .catch((error) => console.error('ERROR', 'Failed to connect to database', error));

const rawQuery = (sql, type, transaction, plain) => (
    /*
    enum QueryTypes {
        SELECT = 'SELECT',
        INSERT = 'INSERT',
        UPDATE = 'UPDATE',
        BULKUPDATE = 'BULKUPDATE',
        BULKDELETE = 'BULKDELETE',
        DELETE = 'DELETE',
        UPSERT = 'UPSERT',
        VERSION = 'VERSION',
        SHOWTABLES = 'SHOWTABLES',
        SHOWINDEXES = 'SHOWINDEXES',
        DESCRIBE = 'DESCRIBE',
        RAW = 'RAW',
        FOREIGNKEYS = 'FOREIGNKEYS',
        SHOWCONSTRAINTS = 'SHOWCONSTRAINTS'
    } */

    new Promise((resolve, reject) => {
        const obj = {};

        if (type) {
            obj.type = sequelize.QueryTypes[type];
        }

        if (transaction) {
            obj.transaction = transaction;
        }

        if (plain) {
            obj.plain = true;
        }

        sequelize.query(sql, obj)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    })
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.book = require('./book')(sequelize, DataTypes);
db.member = require('./member')(sequelize, DataTypes);
db.borrow = require('./borrow')(sequelize, DataTypes);


db.rawQuery = rawQuery;
module.exports = db;
