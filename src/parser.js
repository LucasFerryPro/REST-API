const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function insertLaureates() {
    await pool.query('TRUNCATE prizes,laureates,categories')
    const laureate_ids = [];
    for (let i = 0; i < data.length; i++) {
        if (!data[i].laureates) { continue; }
        for (let j = 0; j < data[i].laureates.length; j++) {
            if (!laureate_ids.includes(data[i].laureates[j].id)) {
                laureate_ids.push(data[i].laureates[j].id);

                await pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
                    [data[i].laureates[j].id, data[i].laureates[j].firstname, data[i].laureates[j].surname], (err) => {
                        if(err) throw err;
                    });

            }
        }
    }
}


async function insertCategories(){

}

insertLaureates()