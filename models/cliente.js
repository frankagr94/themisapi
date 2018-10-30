//---- dependencias ------
const Bookshelf = require('../db');

const Cliente = Bookshelf.Model.extend({
  tableName: 'cliente',
});

module.exports = Cliente;