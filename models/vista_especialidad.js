//---- dependencias ------
const Bookshelf = require('../db');

const Vista_especialidad = Bookshelf.Model.extend({
  tableName: 'vista_especialidad',
});

module.exports = Vista_especialidad;