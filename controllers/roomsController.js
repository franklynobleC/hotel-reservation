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
  if (number_of_occupants < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `number  of occuppants must be  at least 1`
    })
  }
  if (availability_status !== 'Available' && availability_status !== 'Booked') {
    console.log(availability_status)
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "Available or  Booked"`
    })
  }
  if (price <= '5000') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than ${price}`
    })
  }

  try {
    const createdRoom =
      await sql`INSERT  INTO  rooms(room_number,room_type,price,number_of_occupants,availability_status,image_url,room_description)
    VALUES(${room_number}, ${room_type}, ${price},${number_of_occupants}, ${availability_status}, ${image_url}, ${room_description})
    RETURNING room_number, room_type,price,number_of_occupants,availability_status,image_url,room_description`
    // console.log(createdRoom)
    if (createRooms) {
      createdRoom.forEach(roomData => {
        console.log(roomData)
        return res.status(StatusCodes.OK).json(roomData)
      })
    }
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `error,  creating Table ${error}` })
  }
}

const getSingleRoom = async (req, res) => {
  const id = req.params.id

  const roomId = await sql` SELECT  * FROM  rooms  WHERE   id= ${id} `

  if (roomId.length < 1) {
    res
      .status(StatusCodes.OK)
      .json({ error: `invalid  id ${roomId} please  enter a  valid  id` })
  }
  roomId.forEach(data => {
    console.log('data  for  single  room', data)
    res.status(StatusCodes.OK).json({ success: roomId })
  })
}
const updateRoom = async (req, res) => {
  const {
    id,
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status,
    image_url,
    room_description
  } = req.body

  console.log('dATA  ID', id, 'number  of occupants', number_of_occupants)
  if (number_of_occupants < 1 || number_of_occupants > 4) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `number  of occuppants must be  within  1 to 4`
    })
  }
  if (availability_status !== 'Available' && availability_status !== 'Booked') {
    console.log(availability_status)
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "Available or  Booked"`
    })
  }
  if (price <= '5000') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than ${price}`
    })
  }

  try {
    const updatedData = await sql`UPDATE rooms SET room_type=${room_type},
     availability_status=${availability_status}, price=${price}, room_number =${room_number},
    number_of_occupants=${number_of_occupants}, room_description=${room_description} WHERE  id =${id}`

    res.status(StatusCodes.OK).json({ success: `data  updated successfully` })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json({
      error: `en  error  occurred ${error}
`
    })
  }
}

const deleteRoom = async (req, res) => {
  const id = req.params.id

  const deleteData = await sql`DELETE FROM  rooms WHERE  id = ${id}`
  if (deleteData.length < 0) {
    res
      .status(StatusCodes.OK)
      .json({ error: `room  with  id ${id} not found!` })
  }

  res.status(StatusCodes.OK).json({ success: `room  with  id ${id} deleted!` })
}
const getAllRooms = async (req, res) => {
  try {
    const roomsData = await sql` SELECT * FROM rooms`
    console.log(roomsData)
    if (roomsData.length < 1) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `no records  found in  rooms table` })
    }
    res.status(StatusCodes.OK).json(roomsData)
  } catch (error) {
    throw new Error('an Error occurred')
  }
}
module.exports = {
  createRooms,
  getSingleRoom,
  getAllRooms,
  deleteRoom,
  updateRoom
}
