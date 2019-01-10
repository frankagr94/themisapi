//---- dependencias ------
const Bookshelf = require('../db');

const Vista_solicitud_rechazada = Bookshelf.Model.extend({
  tableName: 'vista_solicitud_rechazada',
});

module.exports = Vista_solicitud_rechazada;