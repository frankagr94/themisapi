//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_catalogo = require('./actuacion_catalogo');
const Actuacion = require('./actuacion');
const Recaudo_servicio = require('./recaudo_servicio');
const Documento = require('./documento');

const catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
  actuaciones: function(){
    return this.belongsToMany(Actuacion).through(Actuacion_catalogo);
  },
  recaudos : function(){
    return this.belongsToMany(Documento).through(Recaudo_servicio);
  }
});

module.exports = catalogo_servicio;