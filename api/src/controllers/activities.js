const { Activities } = require('../db.js');

const putActivity = async (req, res, next) => {
    const { name, difficulty, duration, season, idCountries } = req.body;

    if (!name || !difficulty || !duration || !season) 
        return res.status(404).json({msg: 'Faltan ingresar datos en el formulario.'});
    if (difficulty > 5 || difficulty < 1) 
        return res.status(404).json({msg: 'La dificultad se mide entre 1 y 5.'});
    if (duration < 0 || duration > 72) 
        return res.status(404).json({msg: 'La duración máxima son 72hs.'});

    try {
        const existsActivity = await Activities.findOne({
            where: {
              name: name,
            },
        });

        if (existsActivity) return res.status(404).json({ msg:'This activity already exist.'});

        let newActivity = await Activities.create({
            name,
            difficulty,
            duration,
            season,
        });

        await newActivity.addCountries(idCountries);
        return res.json(newActivity);
    } catch (error) {
        return next(error);
    }
};

const getAllActivities = async (req, res, next) => {
    try {
        let activities = await Activities.findAll()
        activities ? res.json(activities) : res.status(404).json({msg: "Can't find activities in the database"});
    } catch (error) {S
        return next(error);
    }
}

module.exports = { putActivity, getAllActivities };