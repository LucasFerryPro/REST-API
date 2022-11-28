const fs = require('fs');
const pool = require('../db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function truncate(){
    await pool.query('TRUNCATE TABLE Nominations, Laureates, Prizes, Categories');
}



async function getCategorie(label){
    let category = await pool.query('SELECT * FROM categories WHERE label = $1',[label])

    return category.rows[0].id_categorie;
}

async function getLaureate(firstname, surname){
    for (let i = 0; i < data.length; i++) {
        if(data[i].laureates){
            for (let j = 0; j < data[i].laureates.length; j++) {
                if(data[i].laureates[j].firstname === firstname && data[i].laureates[j].surname === surname){
                    return data[i].laureates[j].id;
                }
            }
        }
    }
}

async function insertCategories(){
    let categories = [];
    for (let i = 0; i < data.length; i++) {
        let datas = data[i];
        if (datas.category) {
            if (!categories.includes(datas.category)) {
                categories.push(datas.category);
                await pool.query('INSERT INTO categories (label) VALUES ($1)',
                    [datas.category], (err) => {
                        if (err) throw err;
                    });
            }
        }
    }
}

async function insertPrizes(){
    for (let i = 0; i < data.length; i++) {
        datas = data[i];

        await pool.query('INSERT INTO prizes (id_prize,id_categorie,year) VALUES ($1,$2,$3)',
            [i,await getCategorie(datas.category),datas.year], (err) => {
                if (err) console.log(err);
            });
    }
}

async function insertLaureates(){
    let laureate_ids = [];
    for (let i = 0; i < data.length; i++) {
        datas = data[i];
        if (datas.laureates) {
            for (let j = 0; j < datas.laureates.length; j++) {
                if (!laureate_ids.includes(datas.laureates[j].id)) {
                    laureate_ids.push(datas.laureates[j].id);
                    await pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
                        [datas.laureates[j].id, datas.laureates[j].firstname, datas.laureates[j].surname], (err) => {
                            if (err) throw err;
                        });
                }
            }
        }
    }
}

async function insertNominations(){
    for (let i = 0; i < data.length; i++) {
        datas = data[i];
        if (datas.laureates) {
            for (let j = 0; j < datas.laureates.length; j++) {
                await pool.query('INSERT INTO nominations (id_prize,id_laureate,motivation) VALUES ($1,$2,$3)',
                    [i,await getLaureate(datas.laureates[j].firstname,datas.laureates[j].surname),datas.laureates[j].motivation], (err) => {
                        if (err) throw err;
                });
            }
        }
    }
}


async function insert() {
    await truncate();
    await insertCategories();
    await insertPrizes();
    await insertLaureates()
    await insertNominations();
}

insert();