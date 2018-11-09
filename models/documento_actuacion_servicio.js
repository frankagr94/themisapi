//---- dependencias ------
const Bookshelf = require('../db');

const Documento_actuacion_servicio = Bookshelf.Model.extend({
  tableName: 'documento_actuacion_servicio',
});

module.exports = Documento_actuacion_servicio;