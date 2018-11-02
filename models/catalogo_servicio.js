//---- dependencias ------
const Bookshelf = require('../db');

const catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
});

module.exports = catalogo_servicio;