//---- dependencias ------
const Bookshelf = require('../db');

const Vista_cliente_abogado = Bookshelf.Model.extend({
	tableName: 'vista_cliente_abogado',
});

module.exports = Vista_cliente_abogado;
