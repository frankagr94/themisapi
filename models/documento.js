//---- dependencias ------
const Bookshelf = require('../db');
const Documento_servicio = require('./documento_servicio');
const Servicio = require('./servicio');
const Tipo_documento = require('./tipo_documento');
const Recaudo_servicio = require('./recaudo_servicio');
const Catalogo_servicio = require('./catalogo_servicio');

const Documento = Bookshelf.Model.extend({
  tableName: 'documento',
  catalogo_servicios : function(){
    return this.belongsToMany(Catalogo_servicio).through(Recaudo_servicio);
  },
  servicios : function(){
    return this.belongsToMany(Servicio).through(Documento_servicio);
  },
   tipo_documento: function(){
    return this.belongsTo(Tipo_documento);
   } 
});

module.exports = Documento;