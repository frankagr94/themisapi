//---- dependencias ------
const Bookshelf = require('../db');
const Catalogo_servicio = require('./catalogo_servicio');

const Categoria = Bookshelf.Model.extend({
  tableName: 'categoria',
  catalogo_servicio : function(){
    return this.hasMany(Catalogo_servicio, 'categoria_id');
  }
});

module.exports = Categoria;