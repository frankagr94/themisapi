//---- dependencias ------
const Bookshelf = require('../db');
const Acceso_rol = require('./acceso_rol');
const Funcion = require('./funcion');

const Rol = Bookshelf.Model.extend({
  tableName: 'rol',
  funciones: function(){
    return this.belongsToMany(Funcion).through(Acceso_rol)
  }
});

module.exports = Rol;