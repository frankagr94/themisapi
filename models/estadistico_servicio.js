//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_servicio = Bookshelf.Model.extend({
  tableName: 'estadistico_servicio',
});

module.exports = Estadistico_servicio;