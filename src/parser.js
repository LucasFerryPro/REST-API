const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let dataJSON = dataBuffer.toString();
dataJSON = JSON.parse(dataJSON);

async function insertLaureates(){

}

async function insertCategories(){

}