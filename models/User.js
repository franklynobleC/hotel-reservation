// import postgres from 'postgres'
const { dbPool } = require('../db/connectDb')

const createUserTable = async () => {
  const query = `CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30) NOT  NULL,
  password VARCHAR(30) NOT  NULL);
`
  try {
    await dbPool.query(query)
    console.log('User table created successfully.')
  } catch (error) {
    console.log(error.message)
    console.error('Error creating user table:', error)
  }
}

module.exports = createUserTable
