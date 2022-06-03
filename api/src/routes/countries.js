const { Router } = require('express');
const { Country } = require('../models/Country');
const router = Router();

router.get('/', async (req, res) => {
    res.send('llegamos al /countries papa')
})

module.exports = router;