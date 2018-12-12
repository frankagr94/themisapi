//---- dependencias ------
const Bookshelf = require('../db');
const Actuacion = require('./actuacion');

const Actuacion_servicio = Bookshelf.Model.extend({
  tableName: 'actuacion_servicio',
  actuacion: function(){
    return this.belongsTo(Actuacion, 'actuacion_id');
  }
});

module.exports = Actuacion_servicio;