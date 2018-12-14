//----Configuracion------
const { db } = require('../config');

//----Knex------ 
const Knex = require('knex')(db);

//----Booksehlf------ 
const Bookshelf = require('bookshelf')(Knex);
Bookshelf.plugin('registry');
module.exports = Bookshelf;