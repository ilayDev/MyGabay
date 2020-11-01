const hebcore = require('@hebcal/core');
const hebrewCalender = hebcore.HebrewCalendar;
const mongoose = require('mongoose');
const ReadingHistory = mongoose.model('ReadingHistory');
const ToraBook = mongoose.model('ToraBook');


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
    getBooksForWeek(new hebcore.HDate(calcDate));
    setInterval(() => {
        let calcDate = new Date();
        getBooksForWeek(hebcore.HDate(calcDate));
    }, weekInMilliSecs);
}, firstCalcTrigger);


async function getBooksForWeek(hebDate= new hebcore.HDate()) {
    var readingDays = getReadingDays(hebDate);
    let booksFromHistory = await getBooksFromHistory(readingDays);

    readingDays = readingDays.filter(day=>!booksFromHistory.some(book=> book.readingDay === day));
    var booksFromCalc = [];
    if(readingDays.length > 0)
        booksFromCalc = await calcBooksForWeek(hebDate, readingDays);
    
    return [...booksFromHistory,...booksFromCalc];
}

async function getBooksFromHistory(readingDays){
    var booksForWeek=[]
    for (const day of readingDays) {
        try{
            var book = await ReadingHistory.findOne({readingDay: day});
        }
        catch(err){
            console.log(`cant get book from history. 
            ${err.message}`);
        }
        if(book)
            booksForWeek.push(book);
    }
    return booksForWeek;
}

async function calcBooksForWeek(hebDate, readingDays) {
    let booksWithAzcara = await getBooksHaveAzcara(hebDate);
    try {
        var toraBooks = await ToraBook.find({});
    } catch (error) {
        console.log(error.message);
    }
    try {
        //first, make match for books with azcara
        var booksForWeek = [];
        // booksWithAzcara.forEach(async (book) => {
        //     let readingDay = readingDays.shift();
        //     await MatchBookToDay(readingDay, book, booksForWeek, toraBooks);
        // });

        for (const azcaraBook of booksWithAzcara) {
            let readingDay = readingDays.shift();
            await MatchBookToDay(readingDay, azcaraBook, booksForWeek, toraBooks, true);
        }

        //make match for the rest of the reading days
        for (const day of readingDays) {
            //get the book with minimum usageScore
            let choosenBook = toraBooks.reduce(function (prev, curr) {
                return prev.usageScore < curr.usageScore ? prev : curr;
            });
            await MatchBookToDay(day, choosenBook, booksForWeek, toraBooks);
        }
    }
    catch (err) {
        console.log(err.message);
    }
    return booksForWeek;
}

function getReadingDays(hebDate) {
    var upcomingParasha = getUpcomingParasha(hebDate);
    var readingDays = [upcomingParasha];

    const shabat = hebDate.after(0);
    const holidayOnShabat = hebrewCalender.getHolidaysOnDate(shabat, true);
    if (holidayOnShabat !== undefined && holidayOnShabat[0] instanceof hebcore.RoshChodeshEvent) {
        readingDays = [...readingDays, holidayOnShabat[0].render('he')];
    }


    const nextFriday = hebDate.after(6).after(5); //friday of the next week
    const nextSunday = hebDate.after(6).after(0); //sunday of the next week
    const events = getHolidaysBetweenDates(nextSunday, nextFriday); //events in the next week(after shabat)

    readingDays = [...readingDays, ...events];
    return readingDays;
}

async function MatchBookToDay(day, book, booksForWeek, toraBooks, hasAzcara = false) {
    //increase score and save
    try {
        book.usageScore = book.usageScore +1;
        await book.save();   
    } catch (err) {
        console.log(`cant increase book usageScore
        ${err.message}`);
    }
    
    // save match of book and event/sedra to booksHistory collection
    let bookToSave = new ReadingHistory({
        readingDay: day,
        bookName: book.name,
        hasAzcara: hasAzcara,
        bookId: book._id
    });

    try {
        await bookToSave.save();

    } catch (err) {
        console.log(`cant save to book history 
        ${err.message}`);
    }

    booksForWeek.push(bookToSave);
    let index = toraBooks.indexOf(book);
    toraBooks.splice(index, 1);

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


module.exports = { getBooksForWeek, getBooksHaveAzcara};