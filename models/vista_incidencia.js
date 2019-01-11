const Bookshelf = require('../db');

const Vista_incidencia = Bookshelf.Model.extend({
  tableName: 'vista_incidencia',
});

module.exports = Vista_incidencia