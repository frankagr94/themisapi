const Bookshelf = require('../db');
const Vista_servicio_solicitud = require('./vista_servicio_solicitud');

const Vista_solicitud_insumo = Bookshelf.Model.extend({
  tableName: 'vista_solicitudes',
  servicios_solicitados: function(){
  	return this.hasMany(Vista_servicio_solicitud,"id_solicitud")
  }
});

module.exports = Vista_solicitud_insumo