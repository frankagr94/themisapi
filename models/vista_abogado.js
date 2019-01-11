const Bookshelf = require('../db');

const Abogado = Bookshelf.Model.extend({
  tableName: 'abogado',
});

module.exports = Abogado;