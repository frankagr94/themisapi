module.exports = {
  basePath: '/',
  port: process.env.PORT || 3000,
  SECRET_TOKEN: 'miclavedetokens',
  db: {
    client: 'pg',
    connection: process.env.DATABASE_URL /* {
      host     : '127.0.0.1',
      port     : '5432', //5432
      user     : 'postgres',
      password : '1234',
      database : 'themis',
      charset  : 'utf8' 
    } */
  }
}
