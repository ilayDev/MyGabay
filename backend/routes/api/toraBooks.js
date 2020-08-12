const router = require('express').Router();
const mongoose = require('mongoose');
const ToraBook = mongoose.model('ToraBook');
const hebcal = require('hebcal');


var bookForShabatCache = {
    parasha: '',
    book: null
};

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

function getBookFromCache(req,res,next){
    if(isAlreadyCached())
    {
        res.status(200).json(bookForShabatCache.book);
    }
    else
    {
        next();
    }
}

function isAlreadyCached()
{
    let today = new hebcal.HDate();
    let nextParasha = today.getSedra('h');

    let cachedParasha = bookForShabatCache.parasha;

    let i = nextParasha.length;
    while (i--) {
        if (cachedParasha[i] !== nextParasha[i]) return false;
    }
    return true
}

function saveBookInCache(choosenBook)
{   
    let today = new hebcal.HDate();
    let nextParasha = today.getSedra('h');
    bookForShabatCache = {
        parasha: nextParasha,
        book: choosenBook
    };
}


router.get('/bookForShabat',getBookFromCache ,getBooksHaveAzcara ,async(req,res)=>{
    if(typeof res.books == 'undefined' || res.books.length == 0 )
    {
        res.books = await ToraBook.find({});
    }
    
    let choosenBook = res.books.reduce((prev, curr)=> {
        return prev.usageScore < curr.usageScore ? prev : curr;
    });

    choosenBook.usageScore = choosenBook.usageScore +1;
    choosenBook.save();
    saveBookInCache(choosenBook);

    res.json(choosenBook);
    });

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
            let books = await ToraBook.find({});
            let booksWithAzcara =  books.filter(book=>{
                return book.azcaraDates.some(date=>{
                   return date.month== d.month &&
                    date.day == d.day;
                });
            });    
            booksWithAzcaraThisWeek.push(booksWithAzcara);
        }
        res.books =booksWithAzcaraThisWeek.flat(1);
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