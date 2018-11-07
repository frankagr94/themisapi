//---- dependencias ------
const Bookshelf = require('../db');

const Valoracion = Bookshelf.Model.extend({
  tableName: 'valoracion',
});

module.exports = Valoracion;