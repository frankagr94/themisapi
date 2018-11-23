//---- dependencias ------
const Bookshelf = require('../db');

const Empleado_servicio = Bookshelf.Model.extend({
  tableName: 'empleado_servicio',
});

module.exports = Empleado_servicio;