const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();
const { PORT,mongoUri} = require('./config/keys');
const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config

// Connect to MongoDB

mongoose.connect(mongoUri,{
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false,
   useUnifiedTopology: true 
}
).then(() => console.log('MongoDb database Connected...'))
.catch((err)=>console.console.log((err)));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/gigs', require('./routes/gigs.js'));


app.listen(PORT,
  ()=>console.log(`App listensing at http://localhost:${PORT}`));