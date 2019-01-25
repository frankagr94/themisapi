//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_reclamo = Bookshelf.Model.extend({
  tableName: 'estadistico_reclamo',
});

module.exports = Estadistico_reclamo;