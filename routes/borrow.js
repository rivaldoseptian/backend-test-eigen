const express = require('express');
const borrowCtrl = require('../controller/borrow');

const router = express.Router();
const baseroute = '/borrow';


router
    .route(`${baseroute}`)
    .post(
        borrowCtrl.BorrowBook
    );


module.exports = router;
