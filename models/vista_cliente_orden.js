//---- dependencias ------
const Bookshelf = require('../db');
const Vista_orden = require('./vista_orden');

const Vista_cliente_orden = Bookshelf.Model.extend({
	tableName: 'cliente',
	ordenes: function() {
		return this.hasMany(Vista_orden, 'cliente');	
	}
});

module.exports = Vista_cliente_orden;
