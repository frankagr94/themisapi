const Bookshelf = require('../db');

const Vista_reclamo = Bookshelf.Model.extend({
  tableName: 'vista_reclamo',
});

module.exports = Vista_reclamo