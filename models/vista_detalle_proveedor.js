const Bookshelf = require('../db');

const Vista_detalle_proveedor = Bookshelf.Model.extend({
  tableName: 'v_detalle_proveedor',
});

module.exports = Vista_detalle_proveedor