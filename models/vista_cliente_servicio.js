const Bookshelf = require('../db');

const Vista_cliente_servicio = Bookshelf.Model.extend({
  tableName: 'v_cliente_servicio',
});

module.exports = Vista_cliente_servicio