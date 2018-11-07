//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_documento = Bookshelf.Model.extend({
  tableName: 'tipo_documento',
});

module.exports = Tipo_documento;