const Bookshelf = require('../db');
const Empleado_asignado = require('./empleado_asignado');

const Vista_agendas = Bookshelf.Model.extend({
  tableName: 'v_agendas',
  empleados: function(){
  	return this.hasMany(Empleado_asignado,"id_agenda")
  }
});

module.exports = Vista_agendas