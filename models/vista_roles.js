const Bookshelf = require('../db');

const Vista_roles = Bookshelf.Model.extend({
  tableName: 'v_roles',
});

module.exports = Vista_roles