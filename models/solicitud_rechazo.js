//---- dependencias ------
const Bookshelf = require('../db');

const Solicitud_rechazo = Bookshelf.Model.extend({
  tableName: 'solicitud_rechazo',
});

module.exports = Solicitud_rechazo;