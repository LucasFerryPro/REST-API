const fs = require('fs');
const pool = require('./db');

//parse prize.json into postgres db
const dataBuffer = fs.readFileSync("prize.json");
let dataJSON = dataBuffer.toString();
dataJSON = JSON.parse(dataJSON);

//create list of laureates without doubles
let laureats = [];
const laureate_ids = [];
for (let i = 0; i < dataJSON.length; i++) {
    if(dataJSON[i].laureates){
        for (let j = 0; j < dataJSON[i].laureates.length; j++) {
            if(!laureate_ids.includes(dataJSON[i].laureates[j].id)){
                laureate_ids.push(dataJSON[i].laureates[j].id);
                laureats.push(dataJSON[i].laureates[j])
            }
        }
    }
}

//insert into db
for (let i = 0; i < laureats.length; i++) {
    pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
        [laureats[i].id,laureats[i].firstname,laureats[i].surname],(err)=>{
            if (err) throw err
        })
}

// for (let i = 0; i < json.length; i++) {
//     if(json[i].laureates) {
//         const l = json[i].laureates;
//         for (let j = 0; j < l.length; j++) {
//             pool.query('SELECT * FROM laureates WHERE id_laureate = $1', [l[j].id], (error, results) => {
//                 if (error) throw error
//                 if(results.rowCount === 0){
//                     pool.query('INSERT INTO laureates (id_laureate, firstname, surname) VALUES ($1,$2,$3)',
//                         [l[j].id,l[j].firstname,l[j].surname],(err,res)=>{
//                         if (err) throw err
//                         })
//                 }
//             })
//         }
//     }
// }