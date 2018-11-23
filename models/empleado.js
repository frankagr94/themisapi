//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./actuacion_servicio')
const Especialidad = require('./especialidad');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
  actuaciones_servicio: function(){
  	return this.hasMany(Actuacion_servicio);
  },
  especialidad : function(){
    return this.belongsTo(Especialidad);
  }
});

module.exports = Empleado;