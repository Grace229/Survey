const express = require('express');
const path = require('path');
const app = express(); 
const ejs = require('ejs'); 
const randomstring = require("randomstring");
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Survey = require('./models/survey.js');
const userID = randomstring.generate({
    length: 15,
    charset: 'alphanumeric'
  });
  

// db connection
mongoose.connect('mongodb+srv://grace:MQQdp4Rj3JDHdSKe@cluster0.68k1d.mongodb.net/Waaw-Survey')
.then((dbconnect) => console.log('Database connected successfully'))
.catch((err) => console.log('Database connected successfully', err.message))

// setting up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.locals.moment = require('moment')
const PORT = 8000
app.get('/',(req, res) => {
    res.render('index',);
});
app.get('/survey',(req, res) => {
    res.render('survey',);
});
app.get('/success',(req, res) => {
    res.render('success',);
});
app.get('/createsuccess',(req, res) => {
    res.render('createsuccess',);
});
app.post('/survey/create-user',(req, res) => {
    let {firstName, lastName, email, phoneNo} = req.body;
    // console.log('form data', req.body);
    if(!req.body){
        return res.redirect('/')
    }
    let newUser = new User({
       firstName, lastName, email, phoneNo, userID
    });
    newUser.save()
    .then((data) => console.log('User Created Successfully', data))
    .catch((err) => console.log('Error Creating User', err.message))
    res.render('success', {firstName, lastName, userID});
});
app.post('/survey/create-survey',(req, res) => {
    let {title, description, location, startDate, endDate, userId} = req.body;
    // console.log('form data', req.body);
    if(!req.body){
        return res.redirect('/')
    }
    let newSurvey = new Survey({
        title, description, location, startDate, endDate, userId
    });
    newSurvey.save()
    .then((data) => console.log('Survey Created Successfully', data))
    .catch((err) => console.log('Error Creating Survey', err.message))
    res.redirect('/createsuccess');
});
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`))