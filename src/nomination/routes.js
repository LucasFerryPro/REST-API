const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.put('/', controllers.updateMotivation);

module.exports = router;
