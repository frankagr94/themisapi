//---- dependencias ------
const Bookshelf = require('../db');

const Vista_insumo_asociados = Bookshelf.Model.extend({
  tableName: 'v_insumo_asociados',
});

module.exports = Vista_insumo_asociados;