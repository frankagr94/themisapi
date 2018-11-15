//---- dependencias ------
const Bookshelf = require('../db');

const Pais = Bookshelf.Model.extend({
  tableName: 'pais'
});

module.exports = Pais;