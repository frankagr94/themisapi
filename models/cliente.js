//---- dependencias ------
const Bookshelf = require('../db');
const Usuario = require('./usuario');
const Estado = require('./estado');
const Servicio = require('./servicio');
const Solicitud = require('./solicitud');
const Tipo_cliente = require('./tipo_cliente');
const Caracteristica = require('./caracteristica');
const Perfil_caracteristica = require('./perfil_caracteristica');


const Cliente = Bookshelf.Model.extend({
  tableName: 'cliente',
  usuario : function(){
    return this.belongsTo(usuario);
  },
  estado : function(){
    return this.belongsTo(estado);
  },
  servicios: function(){
    return this.hasMany(Servicio);
  },
  solicitudes: function(){
    return this.hasMany(Solicitud);
  },
  tipo_cliente : function(){
    return this.belongsTo(Tipo_cliente);
  },
  caracteristicas : function(){
    return this.belongsToMany(Caracteristica).through(Perfil_caracteristica);
  }
});

module.exports = Cliente;