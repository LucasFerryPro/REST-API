const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.put('/nomination', controllers.updateMotivation);

module.exports = router;
