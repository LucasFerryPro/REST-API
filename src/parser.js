var fs = require('fs');
var pool = require('./db');

//parse prize.json into postgres db
var data = fs.readFileSync('prize.json');
var json = JSON.parse(data);

