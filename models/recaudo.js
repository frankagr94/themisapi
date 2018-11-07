//---- dependencias ------
const Bookshelf = require('../db');

const Recaudo = Bookshelf.Model.extend({
  tableName: 'recaudo',
});

module.exports = Recaudo;