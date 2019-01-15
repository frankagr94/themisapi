const Bookshelf = require('../db');

const Vista_servicio = Bookshelf.Model.extend({
  tableName: 'vista_servicio',
});

module.exports = Vista_servicio