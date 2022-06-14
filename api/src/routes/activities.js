const { Router } = require('express');
const router = Router();
const { putActivity, getAllActivities } = require('../controllers/activities');

router.post('/', putActivity);
router.get('/', getAllActivities);

router.get('*', (req, res) => {
    res.status(404).send('404 not found')
});

module.exports = router;