//---- dependencias ------
const Bookshelf = require('../db');
const Rol = require('./rol');
const Funcion = require('./funcion');

const Acceso_rol = Bookshelf.Model.extend({
  tableName: 'acceso_rol',
  rol : function(){
    return this.belongsTo(Rol);
  },
  funcion : function(){
    return this.belongsTo(Funcion);
  }
});

module.exports = Acceso_rol;