//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./actuacion_servicio');
const Documento = require('./documento');
const Documento_servicio = require('./documento_servicio');
const Actuacion = require('./actuacion');

const Servicio = Bookshelf.Model.extend({
  tableName: 'servicio',
  actuaciones: function(){
    return this.belongsToMany(Actuacion).through(Actuacion_servicio);
  },
  documentos : function(){
    return this.belongsToMany(Documento).through(Documento_servicio);
  }
});

module.exports = Servicio;