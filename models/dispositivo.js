//---- dependencias ------
const Bookshelf = require('../db');
const Usuario = require('./usuario');

const Dispositivo = Bookshelf.Model.extend({
  tableName: 'dispositivo',
  usuario : function(){
    return this.belongsTo(Usuario, 'usuario_id');
  }
});

module.exports = Dispositivo;