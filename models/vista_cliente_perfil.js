const Bookshelf = require('../db');
const Vista_perfil = require('./vista_perfil');

const Vista_cliente_perfil = Bookshelf.Model.extend({
	tableName: 'cliente',
	perfil: function() {
		return this.hasMany(Vista_perfil, 'id_cliente');	
	}
});

module.exports = Vista_cliente_perfil;