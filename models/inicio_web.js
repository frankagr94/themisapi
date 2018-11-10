//---- dependencias ------
const Bookshelf = require('../db');
const Inicio_web = require('./inicio_web');

const Inicio_web = Bookshelf.Model.extend({
  tableName: 'inicio_web',
  imaganes_carrusel : function(){
    return this.belongsTo(Imagen_carrusel, 'id_inicio_web');
  }
});

module.exports = Inicio_web;