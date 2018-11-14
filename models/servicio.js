//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion_servicio = require('./Actuacion_servicio')
const Cliente = require('./Cliente')
const Catalogo_servicio = require('./Catalogo_servicio')


const Servicio = Bookshelf.Model.extend({
  tableName: 'servicio',
    actuaciones_servicio: function(){
  	return this.hasMany('Actuacion_servicio');
  },
    cliente: function(){
  	return this.belongsTo('Cliente');
  },
  catalogo_servicio: function(){
  	return this.belongsTo('Catalogo_servicio');
  }
});

module.exports = Servicio;