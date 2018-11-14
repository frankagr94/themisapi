//---- dependencias ------
const Bookshelf = require('../db');

const Estado_civil = Bookshelf.Model.extend({
  tableName: 'estado_civil'
});

module.exports = Estado_civil;