const express = require('express');
const memberCtrl = require('../controller/members');

const router = express.Router();
const baseroute = '/members';


router
    .route(`${baseroute}`)
    .get(
        memberCtrl.listMembers
    );


module.exports = router;
