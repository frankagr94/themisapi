//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_incidencia2 = Bookshelf.Model.extend({
  tableName: 'estadistico_incidencia2',
});

module.exports = Estadistico_incidencia2;