const Bookshelf = require('../db');
const Vista_servicio_solicitado = require('./vista_servicio_solicitado');

const Vista_horario = Bookshelf.Model.extend({
  tableName: 'vista_horario'
});

module.exports = Vista_horario