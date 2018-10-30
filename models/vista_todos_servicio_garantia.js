const Bookshelf = require('../db');

const Vista_todos_servicio_garantia = Bookshelf.Model.extend({
  tableName: 'v_todos_servicio_garantia',
});

module.exports = Vista_todos_servicio_garantia