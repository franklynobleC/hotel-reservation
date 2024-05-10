// import postgres from 'postgres'
const pool = require('../db/connectDb')

const createRoomsTable = async () => {
  const query = `CREATE TABLE rooms(
  id SERIAL PRIMARY KEY,
   name VARCHAR(30),
   type VARCHAR(30),
   price VARCHAR (30),
   details VARCHAR(30),
   created_at TIMESTAMP
);
`
  await pool.query(query)
}
module.exports = createRoomsTable
