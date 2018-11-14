//---- dependencias ------
const Bookshelf = require('../db');
const Empleado = require('./empleado');
const Inicio_web = require('./inicio_web');
const Filosfia = require('./filosofia'); 

const Empresa = Bookshelf.Model.extend({
  tableName: 'empresa',
  empleados : function(){
    return this.belongsTo(Empleado, 'empresa_id');
  },
  inicio_web: function(){
    return this.belongsTo(Inicio_web, 'empresa_id')
  }

});

module.exports = Empresa;