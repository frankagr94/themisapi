//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_sugerencia = Bookshelf.Model.extend({
  tableName: 'estadistico_sugerencia',
});

module.exports = Estadistico_sugerencia;