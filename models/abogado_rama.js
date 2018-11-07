//---- dependencias ------
const Bookshelf = require('../db');

const Abogado_rama = Bookshelf.Model.extend({
  tableName: 'abogado_rama',
});

module.exports = Abogado_rama;