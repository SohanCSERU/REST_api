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
app.use('/posts',postRoutes);

//Routes 
app.get('/',(req,res) => {
    res.send('we are at root directory');
});


//Connect to DB
mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });

//start Listening to the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});