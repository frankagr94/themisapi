const Bookshelf = require('../db');

const Vista_cliente_consejo = Bookshelf.Model.extend({
  tableName: 'v_cliente_consejo',
});

module.exports = Vista_cliente_consejo