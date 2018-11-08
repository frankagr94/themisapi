//---- dependencias ------
const Bookshelf = require('../db');

const Ruta = Bookshelf.Model.extend({
  tableName: 'Ruta'
});

module.exports = Ruta;