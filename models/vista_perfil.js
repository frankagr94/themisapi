//---- dependencias ------
const Bookshelf = require('../db');

const Vista_perfil = Bookshelf.Model.extend({
  tableName: 'vista_perfil',
});

module.exports = Vista_perfil;