//---- dependencias ------
const Bookshelf = require('../db');
const Documento = require('./documento');
const Servicio = require('./servicio');

const Documento_servicio = Bookshelf.Model.extend({
  tableName: 'documento_servicio',
  documento : function(){
    return this.belongsTo(Documento);
  },
  servicio : function(){
    return this.belongsTo(Servicio);
  }
});

module.exports = Documento_servicio;