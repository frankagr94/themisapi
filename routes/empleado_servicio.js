//---- dependencias ------
const Bookshelf = require('../db');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado_servicio',
});

module.exports = Empleado_servicio;