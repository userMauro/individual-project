const { Country } = require('../db.js');

const getDB = () => {
    const a = Country.findAll();
    return a;
};

module.exports = getDB;