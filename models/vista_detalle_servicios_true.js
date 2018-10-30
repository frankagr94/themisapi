const Bookshelf = require('../db');

const Vista_detalle_servicios_true = Bookshelf.Model.extend({
  tableName: 'v_detalle_servicios_true',
});

module.exports = Vista_detalle_servicios_true