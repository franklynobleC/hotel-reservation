const { response } = require('express')
const { StatusCodes } = require('http-status-codes')
const { dbPool, sql, sqlPool} = require('../db/connectDb')
const  Rooms = require('../queries/rooms')
var bcrypt = require('bcryptjs')


//TODO: ADD AMENITIES TO ROOMS, THIS SHOULD BE ADD AS AN ARRAY IN THE ROOMS TABLE  IN  THE HOTEL-RESERVATION-DB
const createdRooms = async (req, res) => {
  const {
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status,
    image_url,
    room_description
  } = req.body

  if (number_of_occupants < 1 || number_of_occupants >4) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `number  of occupants must be between 1 - 4`
    })
  }
  if (availability_status !== 'available' && availability_status !== 'booked') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "Available or  Booked"`
    })
  }
  if (price <= 5000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than ${price}`
    })
  }
  if(room_type !== 'single' && room_type !== 'double') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `invalid room type ${room_type} please  enter a  valid  room type`
    })
  }

  try {
    const createdRoom = await
                              Rooms.createRoom(room_number,
                              room_type, price,
                              number_of_occupants,
                              availability_status,
                              image_url, room_description)


    if (!createdRoom.data) {
      if (createdRoom.error.includes('room_number must be unique')) {
        return res.status(StatusCodes.BAD_REQUEST).json({error:createdRoom.error})
      }
    }

      if (createdRoom.data) {
        return res.status(StatusCodes.CREATED).json(createdRoom.data)
    }

  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `error,  creating Table ${error}` })
  }
}

const getSingleRoom = async (req, res) => {
  const {id} = req.params

  if(isNaN(id) || id === " ") {

   return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `invalid  id ${id} please  enter a  valid  id` })

  }

  const roomId = await Rooms.getRoomById(id)

  if (!roomId.data) {
   return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `invalid  id ${roomId} please  enter a  valid  id` })
  }
  if(roomId.error) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ room: roomId.error })
  }


  return  res.status(StatusCodes.OK).json({ room: roomId.data })

}
const updateRoom = async (req, res) => {
  const {
    room_id,
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status,
    image_url,
    room_description
  } = req.body


  if (number_of_occupants < 1 || number_of_occupants > 4) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `number  of occupants must be  within  1 to 4`
    })

  }
  if(room_type !== 'single' && room_type !== 'double') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `invalid room type ${room_type} please  enter a  valid  room type`
    })
  }


  if (availability_status !== 'available' && availability_status !== 'booked') {

    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "available or  booked"`
    })
  }
  if (price <= 5000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than ${price}`
    })
  }
    let roomData = {
    room_id,
      room_number,
      room_type,
      price,
      number_of_occupants,
      availability_status,
      image_url,
      room_description
    }

  const    updatedData = await  Rooms.updateRoom(roomData)

  if(updatedData.error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: updatedData.error,
      message: updatedData.message
    })
  }
  return res.status(StatusCodes.OK).json({
    data: updatedData.data,
    message: 'success'}
  )
}

const deleteRoom = async (req, res) => {
  const {id} = req.params

  const deleteData = await Rooms.deleteRoomById(id)


  if (!deleteData.data) {
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json({error: `no room  with  id  ${deleteData.error} not found!`})

  }


  return res.status(StatusCodes.OK).json({
    success: `room with id ${id} deleted!`,
    data: deleteData.data
  })
}

const getAllRooms = async (req, res) => {
  try {
    const roomsData = await   Rooms.allRooms()

    if (!roomsData.data.length) {
     return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `no records  found in  rooms table` })
    }
   return res.status(StatusCodes.OK).json({rooms: roomsData.data})
  } catch (error) {
    throw new Error('an Error occurred')
  }
}
const uploadImage = async (req, res) => {

}
module.exports = {
  createRooms: createdRooms,
  getSingleRoom,
  getAllRooms,
  deleteRoom,
  updateRoom
}
