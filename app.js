/* eslint-disable */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const path = require('path');
const config = require('./config');
const DBVersionControl = require('./migrations');
const APP_DB_VERSION = require('./migrations/app-db-version');
const errorHandlerMiddleware = require('./middleware/errorhandler');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' ,exposedHeaders: 'content-disposition' }));
app.use('/static', express.static(path.join(__dirname, 'uploads')))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/api', router);
app.use(errorHandlerMiddleware);

module.exports = app;

// (async () => {
//     try {

//         const DB_VERSION = await DBVersionControl.getDBVersion();
//         if (APP_DB_VERSION > DB_VERSION) {
//             await DBVersionControl.migrate(DB_VERSION)
//         }
        
//     } catch (error) {
//         throw error;
//     }

//     app.listen(config.port, () => {
//         console.info(`App running on port ${config.port}`);
//     });
// })();