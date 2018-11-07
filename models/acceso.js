//---- dependencias ------
const Bookshelf = require('../db');

const Acceso = Bookshelf.Model.extend({
  tableName: 'acceso',
});

module.exports = Acceso;