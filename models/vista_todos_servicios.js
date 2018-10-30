const Bookshelf = require('../db');
const Vista_servicio_parametro = require('./vista_servicio_parametro');

const Vista_todos_servicios = Bookshelf.Model.extend({
  tableName: 'servicio',
  detalle_servicio: function(){
  	return this.hasMany(Vista_servicio_parametro,"id_servicio")
  }
});

module.exports = Vista_todos_servicios