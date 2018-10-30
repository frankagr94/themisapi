const Bookshelf = require('../db');

const Vista_servicios_calificados = Bookshelf.Model.extend({
  tableName: 'v_servicios_calificados',
});

module.exports = Vista_servicios_calificados