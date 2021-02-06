const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Face_web_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

console.log('connectd to database');

module.exports = db;