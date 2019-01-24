const Bookshelf = require('../db');

const Vista_caracteristica = Bookshelf.Model.extend({
  tableName: 'vista_caracteristica',
});

module.exports = Vista_caracteristica;