const Bookshelf = require('../db');

const Vista_horario = Bookshelf.Model.extend({
  tableName: 'vista_horario'
});

module.exports = Vista_horario