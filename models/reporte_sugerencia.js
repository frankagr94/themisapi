const Bookshelf = require('../db');

const Reporte_sugerencia = Bookshelf.Model.extend({
  tableName: 'reporte_sugerencia',
});

module.exports = Reporte_sugerencia