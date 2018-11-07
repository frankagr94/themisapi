//---- dependencias ------
const Bookshelf = require('../db');

const Acceso_rol = Bookshelf.Model.extend({
  tableName: 'acceso_rol',
});

module.exports = Acceso_rol;