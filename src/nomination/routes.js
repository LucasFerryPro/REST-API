const {Router} = require('express');
const controllers = require('./controller');

const router = Router();

router.put('/nomination', controllers.updateNomination);

module.exports = router;
