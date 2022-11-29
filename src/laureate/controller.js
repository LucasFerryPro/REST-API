const pool = require('../db');
const queries = require('./queries');


const getLaureates = (req, res) => {
    pool.query(queries.getLaureates, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const getLaureate = (req, res) => {
    let results;
    const id = parseInt(req.params.id);
    pool.query(queries.getLaureate, [id], (error, resu) => {
        if (error) { throw error; }
        results = resu.rows[0];
        pool.query(queries.getPrizeByLaureate, [id], (error, resu) => {
            if (error) { throw error; }
            results.prizes = resu.rows;
            console.log(results)
            res.status(200).json(results)
        });
    });

}

const getLaureatesWithMoreThanOnePrize = (req, res) => {
    pool.query(queries.getLaureatesWithMoreThanOnePrize, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const deleteLaureate = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteLaureate, [id], (error, results) => {
        if (error) { throw error; }
        res.status(200).send(`Laureate deleted with ID: ${id}`)
    });
}


module.exports = {
    getLaureates,
    getLaureate,
    getLaureatesWithMoreThanOnePrize,
    deleteLaureate
}