//---- dependencias ------
const Bookshelf = require('../db');
const Acceso_rol = require('./acceso_rol');
const Funcion = require('./funcion');

const Rol = Bookshelf.Model.extend({
  tableName: 'rol',
  funciones: function(){
    return this.belongsToMany(Funcion, 'acceso_rol','rol_id', 'funcion_id');
  }
});

module.exports = Rol;