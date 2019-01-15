const Bookshelf = require('../db');

const Vista_todos_servicios = Bookshelf.Model.extend({
  tableName: 'servicio'
});

module.exports = Vista_todos_servicios