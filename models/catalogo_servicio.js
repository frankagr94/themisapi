//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_catalogo = require('./actuacion_catalogo');

const catalogo_servicio = Bookshelf.Model.extend({
  tableName: 'catalogo_servicio',
  actuaciones: function(){
    return this.hasMany(Actuacion_catalogo, 'catalogo_serv_id');
  }
});

module.exports = catalogo_servicio;