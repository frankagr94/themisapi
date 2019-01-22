const Bookshelf = require('../db');

const Reporte_solicitud = Bookshelf.Model.extend({
  tableName: 'reporte_solicitud'
});

module.exports = Reporte_solicitud