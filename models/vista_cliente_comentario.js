//---- dependencias ------
const Bookshelf = require('../db');
const Vista_comentario = require('./vista_comentario');

const Vista_cliente_comentario = Bookshelf.Model.extend({
	tableName: 'cliente',
	comentarios: function() {
		return this.hasMany(Vista_comentario, 'id_cliente');	
	}
});

module.exports = Vista_cliente_comentario;