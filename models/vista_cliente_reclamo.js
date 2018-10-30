const Bookshelf = require('../db');
const Vista_reclamo = require('./vista_reclamo');

const Vista_cliente_reclamo = Bookshelf.Model.extend({
	tableName: 'cliente',
	reclamos: function() {
		return this.hasMany(Vista_reclamo, 'id_cliente');	
	}
});

module.exports = Vista_cliente_reclamo;