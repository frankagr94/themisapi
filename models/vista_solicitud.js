const Bookshelf = require('../db');

const Vista_solicitud = Bookshelf.Model.extend({
  tableName: 'vista_solicitud'
});

module.exports = Vista_solicitud