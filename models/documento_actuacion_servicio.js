//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./Actuacion_servicio');
const Tipo_documento = require('./Tipo_documento');



const Documento_actuacion_servicio = Bookshelf.Model.extend({
  tableName: 'documento_actuacion_servicio',
    actuacion_servicio: function(){
  	return this.belongsTo('Actuacion_servicio');
  	},
    tipo_documento: function(){
  	return this.belongsTo('Tipo_documento');
  	}
});

module.exports = Documento_actuacion_servicio;