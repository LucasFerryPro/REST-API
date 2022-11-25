const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let data = dataBuffer.toString();
data = JSON.parse(data);

async function truncate(){
    await pool.query('TRUNCATE TABLE Nominations, Laureates, Prizes, Categories', (err) => {
        if (err) throw err;
    });
}



async function getCategorie(label){
    let category = await pool.query('SELECT * FROM categories WHERE label = $1',[label])

    return category.rows[0].id_categorie;
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
        let laureates = data[i].laureates;
        if (!laureates) { continue; } // if no laureates, skip
        for (let j = 0; j < laureates.length; j++) {
            if (!laureate_ids.includes(laureates[j].id)) {
                laureate_ids.push(laureates[j].id);
                await insertQueryLaureates(laureates[j].id, laureates[j].firstname, laureates[j].surname,i).then(() => {
                    console.log("inserted laureate " + laureates[j].id);
                });
            }
        }
    }
}

insertQueryLaureates = async (id, firstname, surname, id_prize) => {
    await pool.query('INSERT INTO laureates (id_laureate, firstname, surname,id_prize) VALUES ($1,$2,$3,$4)',
        [id, firstname, surname,id_prize], (err) => {
            if (err) throw err
        });
}


async function insert() {
    await truncate();
    await insertCategories()
    await insertPrizes();
    await insertLaureates();
}

insert();