const { Router } = require('express');
const router = Router();
const { getAllCountries, getCountryByID } = require('../controllers/countries');

router.get('/', getAllCountries);
router.get('/:id', getCountryByID);

router.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;