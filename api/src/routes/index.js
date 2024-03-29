const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require('./countries.js');
const activities = require('./activities.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter)
router.use('/countries', countries);
router.use('/activities', activities);

router.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;
