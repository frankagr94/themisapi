//---- dependencias ------
const Bookshelf = require('../db');
const Catalogo_servicio = require('./catalogo_servicio');
const Servicio = require('./servicio');
const Actuacion_catalogo = require('./actuacion_catalogo');
const Actuacion_servicio = require('./actuacion_servicio');

const Actuacion = Bookshelf.Model.extend({
  tableName: 'actuacion',
  catalogo_servicios : function(){
    return this.belongsToMany(Catalogo_servicio).through(Actuacion_catalogo);
  },
  servicios : function(){
    return this.belongsToMany(Servicio).through(Actuacion_servicio);
  }
});

module.exports = Bookshelf.model('Actuacion',Actuacion);