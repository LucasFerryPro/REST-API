const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function insert() {
    let laureate_ids = [];
    let categories = [];
    await pool.query('TRUNCATE prizes,laureates,categories')
    for (let i = 0; i < data.length; i++) {
        insertLaureate(data[i],laureate_ids);

        insertCategorie(data[i],categories);
    }
}

async function insertLaureate(data,laureate_ids){
    if (data.laureates) {
        for (let j = 0; j < data.laureates.length; j++) {
            if (!laureate_ids.includes(data.laureates[j].id)) {
                laureate_ids.push(data.laureates[j].id);
                await pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
                    [data.laureates[j].id, data.laureates[j].firstname, data.laureates[j].surname], (err) => {
                        if(err) throw err;
                });
            }
        }
    }
}

async function insertCategorie(data,categories){
    if (data.category) {
        if (!categories.includes(data.category)) {
            categories.push(data.category);
            await pool.query('INSERT INTO categories (label) VALUES ($1)',
                [data.category], (err) => {
                    if (err) throw err;
            });
        }
    }
}

insert()