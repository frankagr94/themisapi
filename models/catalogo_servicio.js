//---- dependencias ------
const Bookshelf = require('../db');
require('./actuacion_catalogo');
require('./actuacion');
const Recaudo_servicio = require('./recaudo_servicio');
const Documento = require('./documento');
const Tipo_valoracion = require('./tipo_valoracion');
const Valoracion_catalogo = require('./valoracion_catalogo');

const Catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
  actuaciones : function(){
    return this.belongsToMany('Actuacion', 'actuacion_catalogo');
  },
  recaudos : function(){
    return this.belongsToMany(Documento, 'recaudo_servicio');
  },
  valoraciones: function(){
    return this.belongsToMany(Tipo_valoracion,'valoracion_catalogo');
  }
});

module.exports = Bookshelf.model('Catalogo_servicio',Catalogo_servicio);