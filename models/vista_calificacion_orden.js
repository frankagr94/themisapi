
//---- dependencias ------
const Bookshelf = require('../db');

const Vista_calificacion_orden = Bookshelf.Model.extend({
  tableName: 'v_calificacion_orden',
});

module.exports = Vista_calificacion_orden;