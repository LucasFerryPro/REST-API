const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function insert() {
    let laureate_ids = [];
    let categories = [];
    await pool.query('TRUNCATE Nominations, Laureates, Prizes, Categories');
    for (let i = 0; i < data.length; i++)


        //trouver un moyen de récupérer l'id de la catégorie et la liste d'id de laureats
        await insertCategorie(data[i],categories);

        await insertPrize(data[i], categoryId);

        await insertLaureate(data[i],laureate_ids,i);

        await insertNomination(data[i],i,laureateIds);
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
            await pool.query('SELECT id_categorie FROM categories WHERE label = $1', [data.category], (err, res) => {
                if (err) throw err;
                return res.rows[0].id_categorie;
            });
        }
    }
}

async function insertPrize(data,category_id){
    await pool.query('INSERT INTO prizes (year,id_categorie) VALUES ($1,$2)',
        [data.year, category_id], (err) => {
            if (err) throw err;
    });
}

async function insertLaureate(data,laureate_ids,prize_id){
    let prizeLaureateIds = [];
    if (data.laureates) {
        for (let j = 0; j < data.laureates.length; j++) {
            if (!laureate_ids.includes(data.laureates[j].id)) {
                laureate_ids.push(data.laureates[j].id);
                await pool.query('INSERT INTO laureates (id_laureate, firstname, surname,id_prize) VALUES ($1,$2,$3,$4)',
                    [data.laureates[j].id, data.laureates[j].firstname, data.laureates[j].surname,prize_id], (err) => {
                        if(err) throw err;
                });
                prizeLaureateIds.push(data.laureates[j].id);
            }
        }
    }
    return prizeLaureateIds;
}

async function insertNomination(data,prize_id){

}

insert()