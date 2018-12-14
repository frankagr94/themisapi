//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./actuacion_servicio');
const Documento = require('./documento');
const Documento_servicio = require('./documento_servicio');
const Actuacion = require('./actuacion');
const Empleado = require('./empleado');
const Abogado_servicio = require('./abogado_servicio');
const Catalogo_servicio = require('./catalogo_servicio');
const Cliente = require('./cliente');

const Servicio = Bookshelf.Model.extend({
  tableName: 'servicio',
  actuaciones: function(){
    return this.belongsToMany(Actuacion).through(Actuacion_servicio);
  },
  documentos : function(){
    return this.belongsToMany(Documento).through(Documento_servicio);
  },
  abogados: function(){
    return this.belongsToMany(Empleado).through(Abogado_servicio);
  },
  servicio : function(){
    return this.belonsgTo(Catalogo_servicio);
  },
  cliente : function(){
    return this.belonsgTo(Cliente);
  }
});

module.exports = Servicio;