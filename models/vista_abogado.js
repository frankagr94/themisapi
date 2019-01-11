const Bookshelf = require('../db');

const Vista_abogado = Bookshelf.Model.extend({
  tableName: 'vista_abogado',
});

module.exports = Vista_abogado;