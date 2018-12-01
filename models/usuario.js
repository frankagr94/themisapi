//---- dependencias ------
const Bookshelf = require('../db');
const Rol = require('./rol');
const Dispositivo = require('./dispositivo');

const Usuario = Bookshelf.Model.extend({
  tableName: 'usuario',
  rol: function(){
    return this.belongsTo(Rol);
  },
  dispositivo: function(){
    return this.hasOne(Dispositivo, 'usuario_id');
  }
});

module.exports = Usuario;