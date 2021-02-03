const express = require('express');
const port=8000;
const app = express();

//app.use(express.urlencoded());
app.use(express.static('./assets'));
//app.use('view engine','ejs');
app.set('views','./views');

// handelling routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('server is running good on port :',port);
});

