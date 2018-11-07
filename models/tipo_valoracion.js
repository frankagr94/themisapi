//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_valoracion = Bookshelf.Model.extend({
  tableName: 'tipo_valoracion',
});

module.exports = Tipo_valoracion;