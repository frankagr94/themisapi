const Bookshelf = require('../db');

const Reporte_incidencia = Bookshelf.Model.extend({
  tableName: 'reporte_incidencia',
});

module.exports = Reporte_incidencia