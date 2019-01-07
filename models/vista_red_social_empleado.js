const Bookshelf = require('../db');

const Vista_red_social_empleado = Bookshelf.Model.extend({
  tableName: 'vista_red_social_empleado',
});

module.exports = Vista_red_social_empleado