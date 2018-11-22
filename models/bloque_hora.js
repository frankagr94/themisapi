//---- dependencias ------
const Bookshelf = require('../db');

const Bloque_hora = Bookshelf.Model.extend({
  tableName: 'bloque_hora',
});

module.exports = Bloque_hora;