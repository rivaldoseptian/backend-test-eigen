const router = require('express').Router();

router.use('/', require('./book'));
router.use('/', require('./member'));

module.exports = router;
