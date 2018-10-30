const Bookshelf = require('../db');

const Vista_detalle_consejo = Bookshelf.Model.extend({
  tableName: 'v_detalle_consejo',
});

module.exports = Vista_detalle_consejo