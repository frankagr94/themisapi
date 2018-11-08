//---- dependencias ------
const Bookshelf = require('../db');
const Rol = require('./rol');

const Usuario = Bookshelf.Model.extend({
  tableName: 'usuario',
  rol: function(){
    return this.belongsTo(Rol, 'id_rol');
  }
});

module.exports = Usuario;