//---- dependencias ------
const Bookshelf = require('../db');
const Categoria = require('./categoria');

const Especialidad = Bookshelf.Model.extend({
  tableName: 'especialidad',
  categorias : function(){
    return this.hasMany(Categoria);
  }
});

module.exports = Especialidad;