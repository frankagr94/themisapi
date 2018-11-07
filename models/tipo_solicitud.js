//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_solicitud = Bookshelf.Model.extend({
  tableName: 'tipo_solicitud',
});

module.exports = Tipo_solicitud;