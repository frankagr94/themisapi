//---- dependencias ------
const Bookshelf = require('../db');

const Vista_empleado = Bookshelf.Model.extend({
  tableName: 'vista_empleado',  
});

module.exports = Vista_empleado;