const Bookshelf = require('../db');
const Vista_insumo_asociados = require('./vista_insumo_asociados');

const Vista_servicio_solicitud = Bookshelf.Model.extend({
  tableName: 'vista_servicio_solicitud',
  insumos_asociados: function(){
  	return this.hasMany(Vista_insumo_asociados,"id_servicio")
  }
});

module.exports = Vista_servicio_solicitud