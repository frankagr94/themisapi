const Bookshelf = require('../db');

const Vista_actuacion_catalogo = Bookshelf.Model.extend({
  tableName: 'vista_actuacion_catalogo',
});

module.exports = Vista_actuacion_catalogo