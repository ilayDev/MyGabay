const mongoose = require('mongoose');

var ToraBookScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    azcaraDates:{
        type: Array
    },
    usageScore:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('ToraBook',ToraBookScheme, "ToraBooks");
