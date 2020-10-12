const router = require('express').Router();

router.use('/toraBooks', require('./toraBooks'));
router.use('/hebcal', require('./hebcal'));


router.use('/calc', require('./calcBooks'));


module.exports = router;