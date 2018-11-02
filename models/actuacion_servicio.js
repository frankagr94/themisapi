//---- dependencias ------
const Bookshelf = require('../db');

const Actuacion_servicio = Bookshelf.Model.extend({
  tableName: 'actuacion_servicio',
});

module.exports = Actuacion_servicio;