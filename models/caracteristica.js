//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./cliente');
const Perfil_caracteristica = require('./perfil_caracteristica');
const Caracteristica_base = require('./caracteristica_base');

const Caracteristica = Bookshelf.Model.extend({
  tableName: 'caracteristica',
  clientes : function(){
    return this.belongsToMany(Cliente).through(Perfil_caracteristica);
  },
  caracteristica_base: function(){
  	return this.belongsTo(Caracteristica_base);
  }
});

module.exports = Caracteristica;