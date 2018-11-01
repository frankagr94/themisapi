//---- dependencias ------
const Bookshelf = require('../db');

const Cita = Bookshelf.Model.extend({
  tableName: 'cita',
});

module.exports = Cita;