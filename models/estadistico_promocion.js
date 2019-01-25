//---- dependencias ------
const Bookshelf = require('../db');

const Estadistico_promocion = Bookshelf.Model.extend({
  tableName: 'estadistico_promocion',
});

module.exports = Estadistico_promocion;