//---- dependencias ------
const Bookshelf = require('../db');

const Caracteristica = Bookshelf.Model.extend({
  tableName: 'caracteristica',
});

module.exports = Caracteristica;