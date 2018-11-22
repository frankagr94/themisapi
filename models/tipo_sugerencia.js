//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_sugerencia = Bookshelf.Model.extend({
  tableName: 'tipo_sugerencia',
});

module.exports = Tipo_sugerencia;