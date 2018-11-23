//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_catalogo = require('./actuacion_catalogo');
const Actuacion = require('./actuacion');
const Recaudo_servicio = require('./recaudo_servicio');
const Documento = require('./documento');
const Servicios = require('./Servicio')

const catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
  actuaciones: function(){
    return this.belongsToMany(Actuacion).through(Actuacion_catalogo);
  },
  recaudos : function(){
    return this.belongsToMany(Documento).through(Recaudo_servicio);
  },
  servicios: function(){
  	return this.hasMany('Servicios');
  }
});

module.exports = catalogo_servicio;