const calcBooks = require('../../logic/calcBooks');
const router = require('./toraBooks');
const hebcore = require('@hebcal/core');
router.get('/bookForWeek', async function(req,res){
    try{
        let books =await calcBooks.getBooksForWeek();
        res.status(200).json(books);
    }
    catch(err){
        res.status(404).json({err: err.message});
    }
});

//for test
router.get('/roshHashana', async function(req,res){
    try{
        let rosh = new hebcore.HDate(27,6,5780);
        var books =await calcBooks.getBooksForWeek(rosh);
        res.status(200).json(books);
    }
    catch(err){
        res.status(404).json({err: err.message});
    }
});

module.exports = router;