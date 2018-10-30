const Bookshelf = require('../db');

const Vista_servicios_con_garantia = Bookshelf.Model.extend({
  tableName: 'v_servicios_con_garantia',
});

module.exports = Vista_servicios_con_garantia