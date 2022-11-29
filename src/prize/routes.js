const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/', controllers.getNbLaureatesByYear);
router.get('/none', controllers.getYearsWithNoPrize);
router.get('/:asc', controllers.getYearsByNbLaureates);

module.exports = router;
