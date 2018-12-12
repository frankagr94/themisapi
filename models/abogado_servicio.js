//---- dependencias ------
const Bookshelf = require('../db');

const Abogado_servicio = Bookshelf.Model.extend({
  tableName: 'abogado_servicio'
});

module.exports = Abogado_servicio;