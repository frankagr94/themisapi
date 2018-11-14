//---- dependencias ------
const Bookshelf = require('../db');
const Inicio_web = require('./inicio_web');
const Filosfia = require('./filosofia');
const inicio_web = Bookshelf.Model.extend({
  tableName: 'inicio_web',
  imagenes_carrusel : function(){
    return this.belongsTo(Imagen_carrusel, 'inicio_web_id');
  },
  
  filosofia: function(){
    return this.belongsTo(Filosfia, 'inicio_web__id');
  }
});

module.exports = inicio_web;