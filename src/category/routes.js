const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/', controllers.getCategories);
router.get('/mostlaureates', controllers.getMostLaureatesCategory);

module.exports = router;