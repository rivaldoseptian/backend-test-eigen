const router = require('express').Router();

router.use('/', require('./book'));
router.use('/', require('./member'));
router.use('/', require('./borrow'));

module.exports = router;
