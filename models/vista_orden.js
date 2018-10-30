//---- dependencias ------
const Bookshelf = require('../db');
const Vista_detalle_servicios_true = require('./vista_detalle_servicios_true');

const Vista_orden = Bookshelf.Model.extend({
  tableName: 'v_orden',
  servicios_realizados: function(){
  	return this.hasMany(Vista_detalle_servicios_true,"id_orden_servicio")
  }
});

module.exports = Vista_orden;