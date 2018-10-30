//---- dependencias ------
const Bookshelf = require('../db');
const Vista_solicitud = require('./vista_solicitud');

const Vista_cliente_solicitud = Bookshelf.Model.extend({
	tableName: 'cliente',
	solicitudes: function() {
		return this.hasMany(Vista_solicitud, 'id_cliente');	
	}
});

module.exports = Vista_cliente_solicitud;
