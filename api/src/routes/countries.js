const { Router } = require('express');
const router = Router();
const getAllCountries = require('../../controllers/countries');
const getApiCountry = require('../utils/getApi');

router.get('/', getAllCountries);

module.exports = router;