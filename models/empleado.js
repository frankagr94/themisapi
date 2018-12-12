//---- dependencias ------
const Bookshelf = require('../db');
const Especialidad = require('./especialidad');
const Servicio = require('./servicio');
const Abogado_servicio= require('./abogado_servicio');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
  especialidad : function(){
    return this.belongsTo(Especialidad);
  },
  servicios:function(){
    return this.belongsToMany(Servicio).through(Abogado_servicio);
  }
});

module.exports = Empleado;