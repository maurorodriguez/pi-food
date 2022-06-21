const { Router } = require('express');
const populateDietsDb = require('../controllers/populateDietsDb');

const router = Router()

router.get('/', populateDietsDb);

module.exports = router