//---- dependencias ------
const Bookshelf = require('../db');

const Objetivo = Bookshelf.Model.extend({
  tableName: 'objetivo_empresa',
});

module.exports = Objetivo;