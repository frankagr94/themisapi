//---- dependencias ------
const Bookshelf = require('../db');
const Categoria = require('./categoria');
const Empleado = require('./empleado');

const Especialidad = Bookshelf.Model.extend({
  tableName: 'especialidad',
  categorias : function(){
    return this.hasMany(Categoria);
  },
  abogados: function(){
    return this.hasMany(Empleado);
  }
});

module.exports = Especialidad;