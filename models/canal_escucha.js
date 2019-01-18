//---- dependencias ------
const Bookshelf = require('../db');

const Canal_escucha = Bookshelf.Model.extend({
  tableName: 'canal_escucha',
});

module.exports = Canal_escucha;