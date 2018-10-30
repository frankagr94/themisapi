const Bookshelf = require('../db');
const Vista_detalle_consejo = require('./vista_detalle_consejo');

const Vista_todos_consejos = Bookshelf.Model.extend({
  tableName: 'v_todos_consejos',
  detalle_consejo: function(){
  	return this.hasMany(Vista_detalle_consejo,"id_consejo")
  }
});

module.exports = Vista_todos_consejos