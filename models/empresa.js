//---- dependencias ------
const Bookshelf = require('../db');
const Empleado = require('./empleado');
const Objetivo = require('./objetivo_empresa');

const Empresa = Bookshelf.Model.extend({
  tableName: 'empresa',
  empleados : function(){
    return this.belongsTo(Empleado, 'id_empresa');
  },
  objetivos : function(){
    return this.belongsTo(Objetivo, 'id_empresa');
  }
});

module.exports = Empresa;