const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/categories', controllers.getCategories);
router.get('/categories/mostlaureates', controllers.getMostLaureatesCategory);

module.exports = router;