const Bookshelf = require('../db');

const Vista_recaudo_catalogo = Bookshelf.Model.extend({
  tableName: 'vista_recaudo_catalogo',
});

module.exports = Vista_recaudo_catalogo