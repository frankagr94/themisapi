//---- dependencias ------
const Bookshelf = require('../db');
const Vista_especialidad = require('./vista_especialidad');

const Categoria_servicio = Bookshelf.Model.extend({
  tableName: 'categoria_servicio',
  empleados: function(){
  	return this.hasMany(Vista_especialidad,"id_categoria_servicio")
  }
});

module.exports = Categoria_servicio;