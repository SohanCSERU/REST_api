const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('dotenv/config');

const port = 3001;


//import routess
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

//Middleware
app.use('/post',postRoutes);
app.use('/user',userRoutes);


//Routes 
app.get('/',(req,res) => {
    res.send('we are at root directory');
});


//Connect to DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

//start Listening to the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});