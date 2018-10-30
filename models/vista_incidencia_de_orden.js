//---- dependencias ------
const Bookshelf = require('../db');

const vista_incidencia_de_orden = Bookshelf.Model.extend({
  tableName: 'v_incidencia_de_orden',
});

module.exports = vista_incidencia_de_orden;