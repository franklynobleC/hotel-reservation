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
    availability_status,
    image_url,
    room_description
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

  if (availability_status === 'Booked') {
    console.log(availability_status)
  }

  if (number_of_occupants < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `number  of occuppants must be  at least 1`
    })
  } else if (
    availability_status !== 'Booked' ||
    availability_status !== 'Available'
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "Available OR  Booked"`
    })
  } else if (price <= '5000') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than 5000`
    })
  }

  try {
    const createdRoom =
      await sql`INSERT  INTO  rooms(room_number,room_type,price,number_of_occupants,availability_status,image_url,room_description)
    VALUES(${room_number}, ${room_type}, ${price},${number_of_occupants}, ${availability_status}, ${image_url}, ${room_description})
    RETURNING room_number, room_type,price,number_of_occupants,availability_status,image_url,room_description`
    // console.log(createdRoom)
    if (createRooms) {
      return res
        .status(StatusCodes.OK)
        .json({ success: `creating Table ${createdRoom}` })
    }
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `error,  creating Table ${error}` })
  }

  // if (createdRoom) {
  //   res.status(StatusCodes.OK).json({ success: 'room created!' })
  // }
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
