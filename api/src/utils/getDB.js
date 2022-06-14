const { Country, Activities } = require('../db.js');

const getDB = async () => {
  return await Country.findAll({
    include: {
      model: Activities,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = getDB;