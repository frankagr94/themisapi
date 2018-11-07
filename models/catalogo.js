//---- dependencias ------
const Bookshelf = require('../db');

const Catalogo = Bookshelf.Model.extend({
  tableName: 'catalogo',
});

module.exports = Catalogo;