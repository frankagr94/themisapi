//---- dependencias ------
const Bookshelf = require('../db');
const Especialidad = require('./especialidad');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
  especialidad : function(){
    return this.belongsTo(Especialidad);
  }
});

module.exports = Empleado;