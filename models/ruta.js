//---- dependencias ------
const Bookshelf = require('../db');

const Ruta = Bookshelf.Model.extend({
  tableName: 'ruta'
});

module.exports = Ruta;