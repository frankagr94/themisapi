//---- dependencias ------
const Bookshelf = require('../db');
const Cita = require('./cita');
const Empleado_asignado = require('./empleado_asignado');

const Vista_orden_cita = Bookshelf.Model.extend({
  tableName: 'v_orden',
  citas: function(){
  	return this.hasMany(Cita,"id_orden_servicio")
  },
  empleados_asignados: function(){
  	return this.hasMany(Empleado_asignado,"id_orden_servicio")
  }
});

module.exports = Vista_orden_cita;