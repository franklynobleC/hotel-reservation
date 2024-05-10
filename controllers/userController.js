const users = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { sql } = require('../db/connectDb')

const getAllUsers = async (req, resp) => {
  const users = await sql`
      SELECT * FROM users`
  if (!users.length > 0) {
    console.log(users)
    return resp
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Error! User Not Found' })
  }
  return resp.status(StatusCodes.OK).json(users)
}
const getSingleUser = async (req, resp) => {
  const { id } = req.params
  console.log('iD Data', id)
  const singleUser = await sql`
SELECT * FROM  users WHERE id =${id}
    `
  if (!singleUser) {
    console.log(singleUser)
    return resp
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `User With ID ${id} NOT_FOUND` })
  }
  return resp.status(StatusCodes.OK).json(singleUser)
}
const deleteUser = async (req, resp) => {
  const { id } = req.params
  console.log('iD Data', id)
  const singleUser = await sql`
   DELETE FROM  users WHERE id =${id}
    `
  if (!singleUser) {
    return resp
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `User With ID ${id} NOT_FOUND` })
  }
  return resp
    .status(StatusCodes.OK)
    .json({ Success: `USER WITH  ID${id} Deleted` })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser
}
