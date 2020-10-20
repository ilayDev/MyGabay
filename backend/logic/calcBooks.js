const hebcore = require('@hebcal/core');
const hebrewCalender = hebcore.HebrewCalendar;
const mongoose = require('mongoose');
const ToraBook = mongoose.model('ToraBook');
const ReadingHistory = mongoose.model('ReadingHistory');


/**
 * get the next day in week for HDate
 * @param {day in week, 0:sunday 6:saturday} day 
 * @param {HDate date} date 
 */
function getNextDay(day, date =new Date())
{
    date.setDate(date.getDate() + (day+(7-date.getDay())) % 7);
    return date;
}

var calcBooksDate = getNextDay(0);
calcBooksDate.setHours(0, 30);
var now = new Date();

var firstCalcTrigger =  calcBooksDate.getTime() - now.getTime();
var weekInMilliSecs = 7*24*60*60*1000; 

// calc books for next week every sundays
setTimeout(() => {
    let calcDate = new Date();
    calcBooksForWeek(new hebcore.HDate(calcDate));
    setInterval(() => {
        let calcDate = new Date();
        calcBooksForWeek(hebcore.HDate(calcDate));
    }, weekInMilliSecs);
}, firstCalcTrigger);

function getBooksForWeek(){
    

}

async function calcBooksForWeek(hebDate= new hebcore.HDate()) {
    var upcomingParasha = getUpcomingParasha(hebDate);
    var readingDays = [upcomingParasha];

    const shabat = hebDate.after(0);
    const holidayOnShabat = hebrewCalender.getHolidaysOnDate(shabat,true);
    if(holidayOnShabat!== undefined && holidayOnShabat[0] instanceof hebcore.RoshChodeshEvent){
        readingDays = [...readingDays, holidayOnShabat[0].render('he') ];
    }

    
    const nextFriday = hebDate.after(6).after(5); //friday of the next week
    const nextSunday =  hebDate.after(6).after(0); //sunday of the next week
    const events = getHolidaysBetweenDates(nextSunday, nextFriday); //events in the next week(after shabat)

    var readingDays = [...readingDays, ...events];
    
    let booksWithAzcara =await getBooksHaveAzcara(hebDate);
    try {
        var toraBooks = await ToraBook.find({});
    } catch (error) {
        console.log(error.message);
    }
    try{
        //first, make match for books with azcara
        var booksForWeek=[];
        booksWithAzcara.forEach(book=> {
            let readingDay = readingDays.shift();
            MatchBookToDay(readingDay, book, booksForWeek, toraBooks);
        });

        //make match for the rest of the reading days
        for (const day of readingDays) {
            //get the book with minimum usageScore
            let choosenBook = toraBooks.reduce(function (prev, curr){
                return prev.usageScore < curr.usageScore ? prev : curr;
                }); 
            MatchBookToDay(day, choosenBook, booksForWeek, toraBooks);
        }
    }
    catch(err){
        console.log(err.message);
    }
    return booksForWeek;
}

function MatchBookToDay(readingDay, book, booksForWeek, toraBooks) {
    let bookForDay = {
        parasha: readingDay,
        book: book
    };
    booksForWeek.push(bookForDay);
    let index = toraBooks.indexOf(book);
    toraBooks.splice(index, 1);
    saveChoosenBook(bookForDay);
}

function getUpcomingParasha(hebDate) {
    const parashot = new hebcore.Sedra(hebDate.getFullYear(), true);
    const upcomingParasha = parashot.getString(hebDate, 'he');
    return upcomingParasha;
}

function getHolidaysBetweenDates(startDate, endDate){
    let day = startDate;
    var events = [];
    while (!day.isSameDate(endDate)) {
        events.push(hebrewCalender.getHolidaysOnDate(day,true));
        day = day.next();
    }
    
    events = events.flat(1);
    //filter falsy elements('undefined') and get only chag events(with sefer tora)
    events = events.filter(event=> event && event.getFlags()%2 == 1 ) 
    events = events.map(ev=>ev.render('he') );

    return events;
}

/**
 * return all the holidays with sefer tora reading until shabat(inclusive)
 * @param {start Date for calc} calcDate 
 */
function getEventsUntilShabat(hebDate) {
    let day = hebDate;
    do {
        var events = [];
        events.push(hebrewCalender.getHolidaysOnDate(day,true));
        day = day.next();
    } while (day.getDay() !== 0); //calc until next shabat(inclusive)

    events = events.flat(1);
    //filter falsy elements('undefined') and get only chag events(with sefer tora)
    events = events.filter(event=> event && event.getFlags()%2 == 1) 
    events = events.map(ev=>ev.render('he') );

    return events;
}

/**
 * finds books have azcara in the week of the startDate 
 */
async function getBooksHaveAzcara(startDate){
    let week = [];
    let day = startDate;
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
        booksWithAzcaraThisWeek = booksWithAzcaraThisWeek.flat(1);
        booksWithAzcaraThisWeek.sort((b1,b2)=> b1.usageScore - b2.usageScore);
        return booksWithAzcaraThisWeek;
    }
    catch (err) {
        console.error("error in getBooksHaveAzcara", err.message);
    }
}

async function saveChoosenBook(bookForDay){
    //increase score and save
    bookForDay.book.usageScore = bookForDay.book.usageScore +1;
    bookForDay.book.save();
    
    // save match of book and event/sedra to booksHistory collection
    let bookToSave = new ReadingHistory({
        readingDay: bookForDay.parasha,
        bookName: bookForDay.book.name,
        bookId: bookForDay.book._id
    });

    try {
        const addToHistory = await bookToSave.save();

    } catch (err) {
        console.log(`cant to book history 
                    ${err.message}`);
    
    }

    // saveBookInCache(bookForDay);



}

module.exports = {calcBooksForWeek, getBooksHaveAzcara};