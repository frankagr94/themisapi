//---- dependencias ------
const Bookshelf = require('../db');

const Vista_agenda = Bookshelf.Model.extend({
  tableName: 'vista_agenda',  
});

module.exports = Vista_agenda;