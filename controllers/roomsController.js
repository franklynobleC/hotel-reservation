const { response } = require('express')
const { StatusCodes } = require('http-status-codes')
const { dbPool, sql } = require('../db/connectDb')
var bcrypt = require('bcryptjs')

const createRooms = async (req, res) => {
  const {
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status
  } = req.body

  console.log(
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status,
    image_url,
    room_description
  )

  const createdRoom =
    await sql`INSERT  INTO  rooms($1,$2 ,$3 ,$4,$5,$5 ,$6 , $7,$8)
    VALUES(${room_number}, ${room_type}, ${price},${number_of_occupants}, ${availability_status}, ${image_url}, ${room_description})
RETURNING room_number, room_type,price,number_of_occupants,availability_status,image_url,room_description`

  console.log(createdRoom)
}

const getSingleRoom = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'single Room' })
}
const updateRoom = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: ' update Room' })
}

const deleteRoom = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'delete Room' })
}
const getAllRooms = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'All Rooms' })
}
module.exports = {
  createRooms,
  getSingleRoom,
  getAllRooms,
  deleteRoom,
  updateRoom
}
