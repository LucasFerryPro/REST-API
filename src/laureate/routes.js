const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/laureates', controllers.getLaureates);
router.get('/laureates/:id', controllers.getLaureate);
router.get('/laureates/morethanoneprize', controllers.getLaureatesWithMoreThanOnePrize);
router.delete('/laureates/:id', controllers.deleteLaureate);

module.exports = router;