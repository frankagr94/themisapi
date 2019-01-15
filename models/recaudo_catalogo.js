//---- dependencias ------
const Bookshelf = require('../db');

const Recaudo_catalogo = Bookshelf.Model.extend({
  tableName: 'recaudo_catalogo',
});

module.exports = Recaudo_catalogo;