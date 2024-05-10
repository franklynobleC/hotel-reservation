const { response } = require('express')
const createUserTable = require('../models/User')
const createRoomsTable = require('../models/Rooms')
const { StatusCodes } = require('http-status-codes')
const { dbPool, sql } = require('../db/connectDb')

// const register = async (req, resp) => {
//   const { email, password, name } = req.body

// console.log(email, password)
// if (!email || !password) {
//   return
// }
//TODO:  HASH password  for  Register,
const register = async (req, resp) => {
  // await createUserTable();
  // await createRoomsTable()
  const { email, password, name } = req.body

  console.log('user Data', email, password, name)
  const emailData = await sql` SELECT * FROM  users WHERE  email =${email}`
  console.log(emailData.length)
  if (emailData.length > 0) {
    console.log(emailData, 'from Data')
    return resp.status(StatusCodes.BAD_REQUEST).json(`Email Already  Exist`)
  }
  if (!email || !password) {
    return resp
      .status(StatusCodes.BAD_REQUEST)
      .json(`Enter Email and Password!`)
  }

  try {
    const users = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
      RETURNING name, email, password
    `

    console.log('from users Data', users)
    return resp.status(StatusCodes.OK).json(`User added with ID: ${users[0]}`)
  } catch (error) {
    console.error(error)
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
  }
}
//TODO: VERIFY Password  for  login with  email and  password
const login = async (req, resp) => {
  const {} = req.body
  resp.status(StatusCodes.OK).json({})
}

module.exports = {
  register,
  login
}
