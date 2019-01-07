const Bookshelf = require('../db');
const Vista_servicio_solicitado = require('./vista_servicio_solicitado');

const Vista_usuario = Bookshelf.Model.extend({
  tableName: 'vista_usuario'
});

module.exports = Vista_usuario