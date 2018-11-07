//---- dependencias ------
const Bookshelf = require('../db');

const Rango_valoracion = Bookshelf.Model.extend({
  tableName: 'rango_valoracion',
});

module.exports = Rango_valoracion;