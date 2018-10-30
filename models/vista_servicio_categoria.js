const Bookshelf = require('../db');

const Vista_servicio_categoria = Bookshelf.Model.extend({
  tableName: 'vista_servicios_categoria',
});

module.exports = Vista_servicio_categoria