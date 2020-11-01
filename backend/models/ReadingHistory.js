const mongoose = require('mongoose');

var ReadingHistoryScheme = new mongoose.Schema({
    readingDay:{
        type: String,
        required: true
    },
    bookName:{
        type: String,
        required: true
    },
    hasAzcara:{
        type: Boolean,
        required: true
    },
    bookId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ReadingHistory',ReadingHistoryScheme);
