//---- dependencias ------
const Bookshelf = require('../db');

const Rama = Bookshelf.Model.extend({
  tableName: 'rama',
});

module.exports = Rama;