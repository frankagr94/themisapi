//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_actuacion = Bookshelf.Model.extend({
  tableName: 'tipo_actuacion',
});

module.exports = Tipo_actuacion;