//---- dependencias ------
const Bookshelf = require('../db');

const Difusion = Bookshelf.Model.extend({
  tableName: 'difusion',
});

module.exports = Difusion;