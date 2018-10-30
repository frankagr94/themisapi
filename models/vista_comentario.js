const Bookshelf = require('../db');

const Vista_comentario = Bookshelf.Model.extend({
  tableName: 'v_comentarios',
});

module.exports = Vista_comentario