const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function insertLaureates(){
    await pool.query('TRUNCATE prizes,laureates,categories')
    let laureats = [];
    const laureate_ids = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i].laureates){
            for (let j = 0; j < data[i].laureates.length; j++) {
                if(!laureate_ids.includes(data[i].laureates[j].id)){
                    laureate_ids.push(data[i].laureates[j].id);
                    laureats.push(data[i].laureates[j])
                }
            }
        }
    }
    for (let i = 0; i < laureats.length; i++) {
        await pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
            [laureats[i].id,laureats[i].firstname,laureats[i].surname], (err) => {
            if(err) throw err;
        })
    }
}

async function insertCategories(){

}

insertLaureates()