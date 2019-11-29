// requiring modules
const express       =   require('express')
const bodyParser    =   require('body-parser')
const nodemon       =   require('nodemon')
const port          = 2000
const path          =   require('path');
const http          =   require('http');
const mongoose      =   require('mongoose');
const passport      =   require('passport');
const LocalStrategy =   require('passport-local').Strategy;
const logger        =   require('express-logger')

// main configurations

const app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', { layout: false });
//app.use(express.logger());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); 

// passport configurations

const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');

// routes
require('./routes')(app);






app.listen(port,()=>{console.log(`Server listenting on port ${port} `)})



