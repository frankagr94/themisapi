const Bookshelf = require('../db');

const Vista_servicio_abogado = Bookshelf.Model.extend({
  tableName: 'vista_servicio_abogado',
});

module.exports = Vista_servicio_abogado