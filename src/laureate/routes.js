const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.get('/', controllers.getLaureates);
router.get('/morethanoneprize', controllers.getLaureatesWithMoreThanOnePrize);
router.get('/:id', controllers.getLaureate);
router.delete('/:id', controllers.deleteLaureate);

module.exports = router;