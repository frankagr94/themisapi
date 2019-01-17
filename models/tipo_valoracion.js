//---- dependencias ------
const Bookshelf = require('../db');
const Rango_valoracion = require('./rango_valoracion');

const Tipo_valoracion = Bookshelf.Model.extend({
  tableName: 'tipo_valoracion',
  rangos: function(){
    return this.belongsToMany(Rango_valoracion, 'tipo_valoracion_rango_valoracion');
  }
});

module.exports = Tipo_valoracion;