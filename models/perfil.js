//---- dependencias ------
const Bookshelf = require('../db');

const Perfil = Bookshelf.Model.extend({
  tableName: 'perfil_caracteristica',
});

module.exports = Perfil;