const Bookshelf = require('../db');

const Vista_cliente_promocion = Bookshelf.Model.extend({
  tableName: 'v_cliente_promocion',
});

module.exports = Vista_cliente_promocion