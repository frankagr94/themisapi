//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./Actuacion_servicio')


const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
  actuaciones_servicio: function(){
  	return this.hasMany('Actuacion_servicio');
  }
});

module.exports = Empleado;