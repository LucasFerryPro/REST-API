const pool = require('../db');
const queries = require('./queries');

const getYearsWithNoPrize = (req, res) => {
    pool.query(queries.getYearsWithNoPrize, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const getNbLaureatesByYear = (req, res) => {
    const year = parseInt(req.params.year);
    pool.query(queries.getNbLaureatesByYear, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const getYearsByNbLaureates = (req, res) => {
    const asc = req.params.asc;
    if (asc == "asc") {
        pool.query(queries.getYearsByNbLaureatesASC, (error, results) => {
            if (error) { throw error; }
            res.status(200).json(results.rows)
        });
    }
    else if (asc == "desc") {
        pool.query(queries.getYearsByNbLaureatesDESC, (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows)
        });
    }
    else {
        res.status(400).send("Bad request");
    }
}

module.exports = {
    getNbLaureatesByYear,
    getYearsWithNoPrize,
    getYearsByNbLaureates
}