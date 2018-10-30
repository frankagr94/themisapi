const Bookshelf = require('../db');

const Vista_detalle_promocion = Bookshelf.Model.extend({
  tableName: 'v_detalle_promocion',
});

module.exports = Vista_detalle_promocion