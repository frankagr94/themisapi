const Bookshelf = require('../db');

const Vista_tr_valoracion = Bookshelf.Model.extend({
  tableName: 'vista_tr_valoracion'
});

module.exports = Vista_tr_valoracion