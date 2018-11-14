//---- dependencias ------
const Bookshelf = require('../db');
const Servicios = require('./Servicios')


const catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
    servicios: function(){
  	return this.hasMany('Servicios');
  }
});

module.exports = catalogo_servicio;