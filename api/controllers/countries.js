const axios = require('axios');
const { Country } = require('../src/db.js');
const getApiCountry = require('../src/utils/getApi.js');
const getDB = require('../src/utils/getDB.js');

const getAllCountries = async (req, res, next) => {
    try {
        let country = await getDB();

        if (country.length === 0) {
            country = await getApiCountry();
            country.forEach(c => {
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
            return res.json(country);
        } else {
            return res.json(country);
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = getAllCountries;