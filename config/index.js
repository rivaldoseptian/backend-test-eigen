require('dotenv').config();

module.exports = {
    env:                   process.env.NODE_ENV || 'development',
    port:                  process.env.PORT || 5000,
    baseAPI:               process.env.BASE_API || 'http://localhost/',

    // config database
    DBDialect:             process.env.DB_DIALECT || 'mysql',
    DBHost:                process.env.DB_HOST || '127.0.0.1',
    DBPort:                +process.env.DB_PORT || 3306,
    DBDatabase:            process.env.DB_DATABASE,
    DBUsername:            process.env.DB_USERNAME || 'root',
    DBPassword:            process.env.DB_PASSWORD || '',
    DBPoolMax:             +process.env.DB_POOL_MAX || 5,
    DBPoolMin:             +process.env.DB_POOL_MINN || 0,
    DBPoolAcquire:         +process.env.DB_POOL_ACQUIRE || 30000,
    DBPoolIdle:            +process.env.DB_POOL_IDLE || 10000,
    DBTimeZone:            process.env.DB_TIME_ZONE || '+00:00',

};
