const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const data = fs.readFileSync('prize.json');
const json = JSON.parse(data.toString());

for (let i = 0; i < json.length; i++) {
    if(json[i].laureates) {
        const l = json[i].laureates;
        for (let j = 0; j < l.length; j++) {
            pool.query('SELECT * FROM laureates WHERE id_laureate = $1', [l[j].id], (error, results) => {
                if (error) throw error
                if (results.rowCount === 0) {
                    pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',[l[j].id,l[j].firstname,l[j].surname], (err, res) => {
                        if(err) console.log(err);
                        else {
                            console.log(res.rows);
                        }
                    })
                }
            })
        }
    }
}


