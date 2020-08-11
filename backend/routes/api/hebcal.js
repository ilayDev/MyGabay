const router = require('express').Router();
const hebcal = require('hebcal');

router.get('/getParasha', (req,res)=>{
    var today = new hebcal.HDate();
    var nextParasha = today.getSedra('h');
    res.status(200).json(nextParasha);
});

module.exports = router;