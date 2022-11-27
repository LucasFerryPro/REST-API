const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/prizes', controllers.getNbLaureatesByYear);
router.get('/prizes/none', controllers.getYearsWithNoPrize);
router.get('/prizes/:year', controllers.getLaureatesByYear);

module.exports = router;
