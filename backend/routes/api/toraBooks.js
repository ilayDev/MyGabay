const router = require('express').Router();
const mongoose = require('mongoose');
const ToraBook = mongoose.model('ToraBook');
const hebcal = require('hebcal');


router.get('/', async(req,res)=>{
    var books = await ToraBook.find({});
    res.status(200).json(books);
})


router.post('/', addNewToraBook);

async function addNewToraBook(req,res,next){
    let dates= req.body.azcaraDates;
    let azcaraDates = [];
    dates.forEach(date => {
        let azcara = new hebcal.HDate(date.day,date.month,date.year); 
        azcaraDates.push(azcara);
    });

    const toraBook = new ToraBook({
        name: req.body.name,
        azcaraDates: azcaraDates
    });

    try {
        const newBook = await toraBook.save();
        res.status(201).json(newBook);

    } catch (err) {
        res.status(400).json({messge: err.messge})
    }
}

router.get('/BooksHaveAzcara',getBooksHaveAzcara,(req,res)=>{
    res.json(res.books);
});


async function getBooksHaveAzcara(req,res,next) {
    const today = new hebcal.HDate();
    let week = [];
    let day = today;
    for (let index = 0; index < 7; index++) {
        week.push(day);
        day = day.next();
    }
    try {
        //find all the books that has azcara next Week
        let booksWithAzcaraThisWeek = [];
        for (const d of week) {
            let booksWithAzcara = await ToraBook.find({ azcaraDates: d });
            booksWithAzcaraThisWeek.push(booksWithAzcara);
        }
        bookWithAzcaraThisWeek = booksWithAzcaraThisWeek.flat(1);
        res.books = bookWithAzcaraThisWeek;
    }
    catch (err) {
        res.status(500).json({ messge: err.messge });
    }
    next();
}

//for dev porpose
router.post('/hasToday', async(req,res)=>{
    const toraBook = new ToraBook({
        name: req.body.name,
        azcaraDates: [new hebcal.HDate()]
    })
    try {
        const newBook = await toraBook.save();
        res.status(201).json(newBook);

    } catch (err) {
        console.error(err);
        res.status(400).json({messge: err});
    }
});


module.exports = router;