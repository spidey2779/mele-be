const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./src/config/dbconnection');
const { admin } = require('./src/routes/admin');
const { rooms } = require('./src/routes/rooms');
const { subCode, deptYear } = require('./src/routes/yearSubjCode');
const { mailSender } = require('./src/routes/mailsender');
const addDetails = require('./src/routes/addDetails');

connection();  //Database connection

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    console.log("HOME");
    res.send("Hello world !") // Home
})
//
app.use('/auth',admin)  //admin login
app.use('/addDetails',addDetails)
app.use('/rooms',rooms)  // rooms retriving from DB
app.use('/year',subCode)  // subject code retriving from DB 
app.use('/roll',deptYear) // roll number retriving from DB
app.use('/mail',mailSender)


app.listen(3000,()=>{
    console.log("Server is running 🛜 ...")
})
