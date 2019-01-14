//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_incidencia = Bookshelf.Model.extend({
  tableName: 'respuesta_incidencia',
});

module.exports = Respuesta_incidencia;