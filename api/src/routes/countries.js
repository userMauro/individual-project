const { Router } = require('express');
const router = Router();
const { getAllCountries, getCountryByID, removeActivity } = require('../controllers/countries');

router.get('/', getAllCountries);
router.get('/:id', getCountryByID);
router.delete('/delete', removeActivity);

router.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;