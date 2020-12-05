const router = require('express').Router();
const hebcal = require('hebcal');

router.get('/getParasha', (req,res)=>{
    const today = new hebcal.HDate();
    const nextParasha = today.getSedra('h');
    res.status(200).json(nextParasha);
});

module.exports = router;
