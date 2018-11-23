//---- dependencias ------
const Bookshelf = require('../db');
const Cliente = require('./cliente');

const Tipo_cliente = Bookshelf.Model.extend({
  tableName: 'tipo_cliente',
  clientes: function(){
    return this.hasMany(Cliente);
  }
});

module.exports = Tipo_cliente;