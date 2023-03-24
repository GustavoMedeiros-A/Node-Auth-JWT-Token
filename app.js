const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware // Function to access for requesting an object // HTTP request -> Middleware -> HTTP response
app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Takes any json data and it passes into a javascript object to use in the code
app.use(cookieParser()); 


// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://GutsMedeiros:1234@cluster0.eauq3xn.mongodb.net/?retryWrites=true&w=majority'; //MongoCloud Config before change
const dbURI = 'mongodb+srv://GutsMedeiros:1234@cluster0.eauq3xn.mongodb.net/node-auth-jwt'; //MongoCloud Config

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser) //apply this in ever single routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies')); //requireAuth is verify the JWT token, if exists and is valid
app.use(authRoutes);

// cookies





