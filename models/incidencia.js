//---- dependencias ------
const Bookshelf = require('../db');

const Incidencia = Bookshelf.Model.extend({
  tableName: 'incidencia',
});

module.exports = Incidencia;