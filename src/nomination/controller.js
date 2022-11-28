const pool = require('../../db');
const queries = require('./queries');

const updateMotivation = (req, res) => {
    const id = parseInt(req.params.id);
    const { motivation } = req.body;
    pool.query(queries.updateMotivation, [motivation, id], (error, results) => {
        if (error) { throw error; }
        res.status(200).send(`Laureate updated with ID: ${id}`)
    });
}

module.exports = {
    updateMotivation
}