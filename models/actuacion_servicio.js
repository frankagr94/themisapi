//---- dependencias ------
const Bookshelf = require('../db');
const Tipo_actuacion = require('./Tipo_actuacion');
const Servicio = require('./Servicio');
const Empleado = require('./Empleado');
const Documento_actuacion_servicio = require('./Documento_actuacion_servicio');


const Actuacion_servicio = Bookshelf.Model.extend({
  tableName: 'actuacion_servicio',
    tipo_actuacion: function(){
  	return this.belongsTo('Tipo_actuacion');
  },
    servicio: function(){
  	return this.belongsTo('Servicio');
  },
    documentos_actuacion_servicio: function(){
  	return this.hasMany('Documento_actuacion_servicio');
  },
    empleado: function(){
  	return this.belongsTo('Empleado');
  }
});

module.exports = Actuacion_servicio;