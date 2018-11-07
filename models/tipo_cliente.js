//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_cliente = Bookshelf.Model.extend({
  tableName: 'tipo_cliente',
});

module.exports = Tipo_cliente;