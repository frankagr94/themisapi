//---- dependencias ------
const Bookshelf = require('../db');

const Caracteristica_base = Bookshelf.Model.extend({
  tableName: 'caracteristica_base',
});

module.exports = Caracteristica_base;