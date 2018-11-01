module.exports = {
  basePath: '/',
  port: process.env.PORT || 3000,
  SECRET_TOKEN: 'miclavedetokens',
  db: {
    client: 'pg',
    connection: process.env.DATABASE_URL /* {
      host     : process.env.DATABASE_URL.host,
      port     : process.env.DATABASE_URL.host.PORT, //5432
      user     : process.env.DATABASE_URL.user,
      password : process.env.DATABASE_URL.password,
      database : process.env.DATABASE_URL.database,
      charset  : 'utf8' 
    }*/
  }
}
