//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_empleado = Bookshelf.Model.extend({
  tableName: 'tipo_empleado',
});

module.exports = Tipo_empleado;