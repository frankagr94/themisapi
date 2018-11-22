//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_respuesta = Bookshelf.Model.extend({
  tableName: 'tipo_respuesta',
});

module.exports = Tipo_respuesta;