const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')



mongoose.connect("mongodb+srv://kuldeepdatabase:peedluk1990@cluster0.ms5dpow.mongodb.net/test", { useNewUrlParser: true })
    .then(() => console.log('mongodb Rock n Roll on 3000'))
    .catch(err => console.log(err))
   

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});