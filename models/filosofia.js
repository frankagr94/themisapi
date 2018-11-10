//---- dependencias ------
const Bookshelf = require('../db');

const Filosofia = Bookshelf.Model.extend({
  tableName: 'filosofia'
});

module.exports = Filosofia;