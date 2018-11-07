//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_valoracion_rango_valoracion = Bookshelf.Model.extend({
  tableName: 'tipo_valoracion_rango_valoracion',
});

module.exports = Tipo_valoracion_rango_valoracion;