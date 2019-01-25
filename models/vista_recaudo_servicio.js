//---- dependencias ------
const Bookshelf = require('../db');

const Vista_recaudo_servicio = Bookshelf.Model.extend({
  tableName: 'vista_recaudo_servicio',
});

module.exports = Vista_recaudo_servicio;