const Bookshelf = require('../db');

const Vista_valoracion = Bookshelf.Model.extend({
  tableName: 'vista_valoracion'
});

module.exports = Vista_valoracion