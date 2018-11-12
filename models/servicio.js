//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./actuacion_servicio');
const Documento = require('./documento');
Documento_servicio = require('./documento_servicio');

const Servicio = Bookshelf.Model.extend({
  tableName: 'servicio',
  actuaciones: function(){
    return this.hasMany(Actuacion_servicio, 'servicio_id');
  },
  documentos : function(){
    return this.belongsToMany(Documento).through(Documento_servicio);
  }
});

module.exports = Servicio;