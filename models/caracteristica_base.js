//---- dependencias ------
const Bookshelf = require('../db');
const Caracteristica = require('./caracteristica');


const Caracteristica_base = Bookshelf.Model.extend({
  tableName: 'caracteristica_base',
  caracteristicas: function(){
  	return this.hasMany(Caracteristica);
  }
});

module.exports = Caracteristica_base;