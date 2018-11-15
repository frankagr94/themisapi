//---- dependencias ------
const Bookshelf = require('../db');
const Rol = require('./Rol')
const Usuario = Bookshelf.Model.extend({
  tableName: 'usuario',
  rol: function(){
    return this.belongsTo(Rol);
  }
  
});

module.exports = Usuario;