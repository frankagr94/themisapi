//---- dependencias ------
const Bookshelf = require('../db');

const Imagen_carrusel = Bookshelf.Model.extend({
  tableName: 'imagen_carrusel'
});

module.exports = Imagen_carrusel;