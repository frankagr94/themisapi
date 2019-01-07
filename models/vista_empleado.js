//---- dependencias ------
const Bookshelf = require('../db');
const Vista_red_social_empleado = require('./vista_red_social_empleado');

const Vista_empleado = Bookshelf.Model.extend({
  tableName: 'vista_empleado',
  redes_sociales : function(){
    return this.hasMany(Vista_red_social_empleado, "empleado_id");
  }  
});

module.exports = Vista_empleado;