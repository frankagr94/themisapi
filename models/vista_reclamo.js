const Bookshelf = require('../db');

const Vista_reclamo = Bookshelf.Model.extend({
  tableName: 'vista_reclamos_realizados',
});

module.exports = Vista_reclamo