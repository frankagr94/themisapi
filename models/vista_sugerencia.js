const Bookshelf = require('../db');

const Vista_sugerencia = Bookshelf.Model.extend({
  tableName: 'vista_sugerencia',
});

module.exports = Vista_sugerencia