const Bookshelf = require('../db');

const Vista_cita = Bookshelf.Model.extend({
  tableName: 'vista_cita',
});

module.exports = Vista_cita