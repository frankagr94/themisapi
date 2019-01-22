const Bookshelf = require('../db');

const Reporte_promocion = Bookshelf.Model.extend({
  tableName: 'reporte_promocion'
});

module.exports = Reporte_promocion