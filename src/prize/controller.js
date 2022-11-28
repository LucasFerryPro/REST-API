const pool = require('../../db');
const queries = require('./queries');

const getNbLaureatesByYear = (req, res) => {
    pool.query(queries.getNbLaureatesByYear, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const getYearsWithNoPrize = (req, res) => {
    pool.query(queries.getYearsWithNoPrize, (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

const getLaureatesByYear = (req, res) => {
    const year = parseInt(req.params.year);
    pool.query(queries.getLaureatesByYear, [year], (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows)
    });
}

module.exports = {
    getNbLaureatesByYear,
    getYearsWithNoPrize,
    getLaureatesByYear
}