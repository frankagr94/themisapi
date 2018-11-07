//---- dependencias ------
const Bookshelf = require('../db');

const Recaudo_servicio = Bookshelf.Model.extend({
  tableName: 'recaudo_servicio',
});

module.exports = Recaudo_servicio;