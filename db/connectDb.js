const postgres = require('postgres')
require('dotenv').config()



const { Connection } = require('postgresql-client')

const { Pool } = require('pg')


const sqlPool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

const  getConnection =async options => {

  try {
    console.log('Before connection')
    return await sqlPool.connect(options)
  } catch (e) {
    console.log('connection Error')
    console.error(e.message, e)
  }
}
module.exports = {
  sqlPool,
  // sqlQuery,
  getConnection
}
