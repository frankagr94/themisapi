//---- dependencias ------
const Bookshelf = require('../db');
const Documento_actuacion_servicio = require('./Documento_actuacion_servicio');

const Tipo_documento = Bookshelf.Model.extend({
  tableName: 'tipo_documento',
  documentos_actuacion_servicio: function(){
  	return this.hasMany('Documento_actuacion_servicio');
  }
});

module.exports = Tipo_documento;