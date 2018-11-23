const heroku_url =  process.env.DATABASE_URL || 'postgres://kjrfttfynoghsc:74a95068d0d00a672f95e4c084abaac484b39fd8821aa94b13f22682b1fbc7e6@ec2-54-225-98-131.compute-1.amazonaws.com:5432/d9avpgfr1tidjr?ssl=true'
module.exports = {
  basePath: '/',
  port: process.env.PORT || 3000,
  SECRET_TOKEN: 'miclavedetokens',
  db: {
    client: 'pg',
    connection: heroku_url /* {
      host     : '127.0.0.1',
      port     : '5432', //5432
      user     : 'postgres',
      password : 'postgres',
      database : 'themis',
      charset  : 'utf8'
    } */
  }
}
