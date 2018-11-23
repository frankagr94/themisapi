//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./cliente');
const Caracteristica = require('./caracteristica');


const Perfil_caracteristica = Bookshelf.Model.extend({
  tableName: 'perfil_caracteristica',
  cliente : function(){
    return this.belongsTo(Cliente);
  },
  caracteristica : function(){
    return this.belongsTo(Caracteristica);
  }
});

module.exports = Perfil_caracteristica;