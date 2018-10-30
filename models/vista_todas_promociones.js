const Bookshelf = require('../db');
const Vista_detalle_promocion = require('./vista_detalle_promocion');

const Vista_todas_promociones = Bookshelf.Model.extend({
  tableName: 'v_todas_promociones',
  detalle_promocion: function(){
  	return this.hasMany(Vista_detalle_promocion,"id_promocion")
  }
});

module.exports = Vista_todas_promociones