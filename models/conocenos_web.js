//---- dependencias ------
const Bookshelf = require('../db');

const Conocenos_web = Bookshelf.Model.extend({
  tableName: 'conocenos_web'
});

module.exports = Conocenos_web;