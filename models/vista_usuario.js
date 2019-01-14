const Bookshelf = require('../db');

const Vista_usuario = Bookshelf.Model.extend({
  tableName: 'vista_usuario'
});

module.exports = Vista_usuario