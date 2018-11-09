//---- dependencias ------
const Bookshelf = require('../db');

const Actuacion_catalogo = Bookshelf.Model.extend({
  tableName: 'actuacion_catalogo',
});

module.exports = Actuacion_catalogo;