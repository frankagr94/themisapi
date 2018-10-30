const Bookshelf = require('../db');

const Vista_servicio_con_incidencia = Bookshelf.Model.extend({
  tableName: 'v_servicion_con_incidencia',
});

module.exports = Vista_servicio_con_incidencia