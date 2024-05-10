const postgres = require('postgres')

const { Connection } = require('postgresql-client')
const { Pool } = require('postgresql-client')

// const sqlPool = new Pool({
//   host: 'localhost', // Postgres ip address[s] or domain name[s]
//   port: 5432, // Postgres server port[s]
//   database: 'hotel', // Name of database to connect to
//   username: 'frankessien', // Username of database user
//   password: 'franktest' // Password of database user
// })

// const sql = postgres(sqlPool)

const sql = postgres('postgres://postgres:franktest@localhost:5432/postgres')
const dbPool = new Pool({
  host: 'postgres://postgres:franktest@localhost:5432/postgres',
  pool: {
    min: 1,
    max: 10,
    idleTimeoutMillis: 5000
  }
})

const connectDb = async () => {
  try {
    console.log('Connected to database')
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  // sqlPool,
  // sqlQuery,
  sql,
  connectDb,
  dbPool
}
