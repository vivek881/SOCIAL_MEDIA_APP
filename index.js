const express = require('express');
const cookieParser = require('cookie-parser');
const port=8000;
const app = express();
const db = require('./config/mongoose');
//to use session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie in db
app.use(session({
    name:'codial',
    secret: 'blasomethion',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (100*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove: 'disabled'
        
    },function(err){console.log(err|| 'connect mongo-db setup ok ')}
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// handelling routes
app.use('/',require('./routes'));
// app.get('/',function(req,res){
//     res.render('home.ejs');
// });
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('server is running good on port :',port);
});

