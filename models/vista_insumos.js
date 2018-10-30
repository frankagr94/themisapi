//---- dependencias ------
const Bookshelf = require('../db');

const Vista_insumos = Bookshelf.Model.extend({
  tableName: 'v_insumos',
});

module.exports = Vista_insumos;