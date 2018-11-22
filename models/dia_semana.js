//---- dependencias ------
const Bookshelf = require('../db');

const Dia_semana = Bookshelf.Model.extend({
  tableName: 'dia_semana',
});

module.exports = Dia_semana;