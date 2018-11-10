//---- dependencias ------
const Bookshelf = require('../db');
const Acceso_rol = require('./acceso_rol');
const Rol = require('./rol');
const Ruta = require('./ruta')

const Funcion = Bookshelf.Model.extend({
  tableName: 'funcion',
  roles : function(){
    return this.belongsToMany(Rol, 'acceso_rol', 'funcion_id', 'ro_id');
  }, 
  ruta : function(){
    return this.belongsTo(Ruta);
  }
});

module.exports = Funcion;