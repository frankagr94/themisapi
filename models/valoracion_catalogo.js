const Bookshelf = require('../db');

const Valoracion_catalogo = Bookshelf.Model.extend({
  tableName: 'valoracion_catalogo'
});

module.exports = Valoracion_catalogo