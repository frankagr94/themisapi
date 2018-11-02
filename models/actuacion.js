//---- dependencias ------
const Bookshelf = require('../db');

const Actuacion = Bookshelf.Model.extend({
  tableName: 'actuacion',
});

module.exports = Actuacion;