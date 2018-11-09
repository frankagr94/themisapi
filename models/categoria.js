//---- dependencias ------
const Bookshelf = require('../db');

const Categoria = Bookshelf.Model.extend({
  tableName: 'categoria',
});

module.exports = Categoria;