const express = require('express');
const borrowCtrl = require('../controller/borrow');

const router = express.Router();
const baseroute = '/borrow';


router
    .route(`${baseroute}`)
    .post(
        borrowCtrl.BorrowBook
    );


    router
    .route(`${baseroute}`)
    .put(
        borrowCtrl.returnBook
    );



module.exports = router;
