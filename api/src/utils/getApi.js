const axios = require('axios');

const getApiCountry = async (req, res) => {
    const { data } = await axios.get('https://restcountries.com/v3/all');
    let countries = [];
    data.map(c => countries.push({
        id: c.cca3,
        name: c.name.common,
        img: c.flags[0],
        continent: c.region,
        capital: c.capital ? c.capital[0] : 'No capital',
        subregion: c.subregion ? c.subregion : 'Antarctic',
        area: c.area,
        population: c.population,
    }));
    return countries;
};

module.exports = getApiCountry;