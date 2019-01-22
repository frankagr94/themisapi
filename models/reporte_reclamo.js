const Bookshelf = require('../db');

const Reporte_reclamo = Bookshelf.Model.extend({
  tableName: 'reporte_reclamo',
});

module.exports = Reporte_reclamo