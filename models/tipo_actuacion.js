//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./Actuacion_servicio');

const Tipo_actuacion = Bookshelf.Model.extend({
  tableName: 'tipo_actuacion',
    actuaciones_servicio: function(){
  	return this.hasMany('Actuacion_servicio');
  }
});

module.exports = Tipo_actuacion;