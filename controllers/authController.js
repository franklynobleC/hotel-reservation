const { response } = require('express')
const createUserTable = require('../models/User')
const createRoomsTable = require('../models/Rooms')
const { StatusCodes } = require('http-status-codes')
const { dbPool, sql } = require('../db/connectDb')
var bcrypt = require('bcryptjs')

// const register = async (req, resp) => {
//   const { email, password, name } = req.body

// console.log(email, password)
// if (!email || !password) {
//   return
// }
//TODO:  HASH password  for  Register,
const register = async (req, resp) => {
  // let hashedPassword
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
  if (password.length <= 5) {
    console.log(password.length)
    return resp
      .status(StatusCodes.BAD_REQUEST)
      .json(`password length must be at least 6 characters`)
  } else {
    //hash  password and  store  in Database
    bcrypt.genSalt(10, async function (err, salt) {
      const hashedPassword = bcrypt.hashSync(password, salt)
      // console.log('hashed Password', hashedPassword)

      try {
        const users = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING name, email, password
      `

        console.log('from users Data', users)

        return resp
          .status(StatusCodes.OK)
          .json(`User added with ID: ${users.columns[1]}`)
      } catch (error) {
        console.error(error)
        return resp
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message })
      }
    })
  }
}
//TODO: VERIFY Password  for  login with  email and  password
const login = async (req, resp) => {
  const { email, password } = req.body
  console.log(email, password)
  if (!email || !password) {
    resp
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'please enter email and  password' })
  }

  const user = await sql` SELECT * FROM  users  WHERE  email = ${email}`

  if (user.length < 1) {
    return resp
      .status(StatusCodes.BAD_REQUEST)
      .json({ Error: 'user not found!' })
  } else {
    user.forEach(async data => {
      const passwordHashed = await data.password

      const isMatched = await comparePassword(password, passwordHashed)

      if (isMatched === false) {
        return resp
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'password not matched' })
      } else {
        return resp.status(StatusCodes.OK).json({ Success: 'login success!' })
      }
    })
  }
}

const comparePassword = async (password, hashedPassword) => {
  let isMatched
  await bcrypt.compare(password, hashedPassword).then(res => {
    if (res === false) {
      return (isMatched = false)
    }
    return (isMatched = true)
  })
  return isMatched
}

module.exports = {
  register,
  login,
  comparePassword
}
