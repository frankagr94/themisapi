//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_reporte = Bookshelf.Model.extend({
  tableName: 'estadistico_reporte',
});

module.exports = Estadistico_reporte;