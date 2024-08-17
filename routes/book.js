const express = require('express');
const bookCtrl = require('../controller/book');

const router = express.Router();
const baseroute = '/books';


router
    .route(`${baseroute}`)
    .get(
        bookCtrl.listBooks
    );


module.exports = router;
