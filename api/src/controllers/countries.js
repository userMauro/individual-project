const { Country } = require('../db.js');
const getApiCountry = require('../utils/getApi.js');
const getDB = require('../utils/getDB.js');

const getAllCountries = async (req, res, next) => {
    let { name } = req.query;
    try {
        if (name) {
            name = name.toLowerCase();
            let countries = await getDB();
            countries = countries.filter(c => c.name.toLowerCase().includes(name))
            countries.length ? res.status(200).json(countries) : res.status(404).json({msg: `The country ${name} does not exist`});
        }

        let countries = await getDB();
        if (countries.length === 0) {
            countries = await getApiCountry();
            countries.forEach(c => {
                Country.findOrCreate({where: {
                    id: c.id,
                    name: c.name,
                    img: c.img,
                    continent: c.continent,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                }})
            });
            return res.json(countries);
        } else {
            return res.json(countries);
        }
    } catch (error) {
        return next(error);
    }
};

const getCountryByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        let country = await getDB();
        country = country.find(c => c.id === id);

        country ? res.json(country) : res.status(404).json({msg: `The id ${id} does not exists`})
    } catch (error) {
        return next(error);
    }
};

const removeActivity = async (req, res, next) => {
    try {
        const { idActivity, idCountry } = req.body;
        let countryID = await Country.findByPk(idCountry);
        if (countryID) {
            countryID.removeActivity([idActivity])
            res.json({msg: 'Activity removed'})
        };
    } catch (error) {
        return next(error)
    };
};

module.exports = { getAllCountries, getCountryByID, removeActivity };