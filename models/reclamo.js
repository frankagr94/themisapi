//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./cliente');
const Tipo_reclamo = require('./tipo_reclamo');

const Reclamo = Bookshelf.Model.extend({
  tableName: 'reclamo',
  cliente : function(){
    return this.belongsTo(Cliente);
  },
  tipo_reclamo : function(){
    return this.belongsTo(Tipo_reclamo);
  }
});

module.exports = Reclamo;