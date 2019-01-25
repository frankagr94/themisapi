//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_incidencia = Bookshelf.Model.extend({
  tableName: 'estadistico_incidencia',
});

module.exports = Estadistico_incidencia;