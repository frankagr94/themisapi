//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_garantia = Bookshelf.Model.extend({
  tableName: 'tipo_garantia',
});

module.exports = Tipo_garantia;