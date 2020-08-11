const router = require('express').Router();

router.use('/toraBooks', require('./toraBooks'));
router.use('/hebcal', require('./hebcal'));


module.exports = router;