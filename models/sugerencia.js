//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./cliente');
const Tipo_sugerencia = require('./tipo_sugerencia');

const Sugerencia = Bookshelf.Model.extend({
  tableName: 'sugerencia',
  cliente : function(){
    return this.belongsTo(Cliente);
  },
  tipo_sugerencia : function(){
    return this.belongsTo(Tipo_sugerencia);
  }
});

module.exports = Sugerencia;