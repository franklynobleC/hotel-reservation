import postgres from 'postgres'
import pool from '../db/connectDb'

const createReservationTable = async () => {
  const query = `CREATE TABLE reservation(
   id SERIAL PRIMARY KEY,
   user_id int REFERENCE users(id),
   room_id int REFERENCE rooms(id),
   type VARCHAR(30),
   price VARCHAR (30),
   details VARCHAR(30),
   check_in_date  DATE NOT NULL,
   check_out_date  DATE NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
  await pool.query(query)
}
module.exports = createReservationTable
