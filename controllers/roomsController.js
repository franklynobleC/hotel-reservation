const { response } = require('express')
const { StatusCodes } = require('http-status-codes')
const { dbPool, sql, sqlPool} = require('../db/connectDb')
const  Rooms = require('../queries/rooms')
var bcrypt = require('bcryptjs')

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
      error: `number  of occupants must be  at least 1`
    })
  }
  if (availability_status !== 'available' && availability_status !== 'booked') {
    console.log(availability_status)
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ` availability status must either be "Available or  Booked"`
    })
  }
  if (price <= 5000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `please ensure price is greater  than ${price}`
    })
  }

  try {
    const createdRoom = await
                              Rooms.createRoom(room_number,
                              room_type, price,
                              number_of_occupants,
                              availability_status,
                              image_url, room_description)

    console.log('FROM CREATED ROOMS', createdRoom)
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
    console.log(id)
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
    id,
    room_number,
    room_type,
    price,
    number_of_occupants,
    availability_status,
    image_url,
    room_description
  } = req.body

  // console.log('dATA  ID', id, 'number  of occupants', number_of_occupants)
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
      error: `en  error  occurred ${error}`
    })
  }
}

const deleteRoom = async (req, res) => {
  const {id} = req.params
  console.log(id)

  const deleteData = await Rooms.deleteRoomById(id)
  console.log(deleteData.data)

  if(!deleteData.data) {
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json({error: `room  with  id ${deleteData.error} not found!`})

  }
console.log('Deleted data',deleteData)
  return  res.status(StatusCodes.OK).json({ success: `${id} deleted!`,
    data:`${deleteData.data}`})}

const getAllRooms = async (req, res) => {
  try {
    const roomsData = await   Rooms.allRooms()

    if (!roomsData.data.length) {
     return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `no records  found in  rooms table` })
    }
   return res.status(StatusCodes.OK).json(roomsData)
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
