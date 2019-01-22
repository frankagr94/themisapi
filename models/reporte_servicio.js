const Bookshelf = require('../db');

const Reporte_servicio = Bookshelf.Model.extend({
  tableName: 'reporte_servicio',
});

module.exports = Reporte_servicio