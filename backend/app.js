require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app= express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology:true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listenning on port: ${port} `);
    
})