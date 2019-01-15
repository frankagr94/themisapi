//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_sugerencia = Bookshelf.Model.extend({
  tableName: 'respuesta_sugerencia',
});

module.exports = Respuesta_sugerencia;