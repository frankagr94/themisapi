//---- dependencias ------
const Bookshelf = require('../db');
const Usuario = require('./usuario');

const Notificacion = Bookshelf.Model.extend({
  tableName: 'notificacion',
  usuario: function() {
    return this.belongsTo(Usuario, 'usuario_id');
  }
});

module.exports = Notificacion;