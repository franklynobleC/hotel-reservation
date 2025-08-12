const { StatusCodes } = require('http-status-codes')
const { response } = require('express')

const { dbPool, sql } = require('../db/connectDb')
const Reservations = require("../queries/reservations");

const createReservation = async (req, res) => {
  const {user_id,room_id, checkin_date,checkout_date,total_price,reservations_status,number_of_guests} = req.body
   console.log("checking All Data",user_id,room_id, checkin_date,checkout_date,total_price,reservations_status,number_of_guests)
    let checkIn = new Date(Date.parse(checkin_date))
    let checkOut = new Date(Date.parse(checkout_date))
  //TODO: EXTRACT THE DAY IN THE DATE AND USE IT TO CALCULATE THE NUMBER OF DAYS MULTIPLY BY THE PRICE OF THE ROOM, THEN YOU GET THE TOTAL PRICE
  console.log(checkIn,checkOut)

  res.status(StatusCodes.OK).json({ message: `create reservation` })
}

const getReservations = async (req, res) => {
  const reservations = await Reservations.allReservations()

  if(reservations.error) {
   return res.status(StatusCodes.BAD_REQUEST).json({  error: reservations.error, message: reservations.message })

  }
  return res.status(StatusCodes.OK).json({ success: reservations.data, message: `success11` })
}

const getSingleReservation = async (req, res) => {
  console.log('Getting single Reservations')
  const  {id} = req.params
  if(isNaN(id) || id === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({  error: 'invalid id', message: 'invalid id' })
  }
  const reservation = await  Reservations.getSingleReservations(id)

    if(reservation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({  error: reservation.error, message: reservation.message })


  }
  return res.status(StatusCodes.OK).json({ message: `get SingleReservation` })
}
const deleteReservation = async (req, res) => {
  const  {id} = req.params
  if(isNaN(id) || id === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({  error: 'invalid id', message: 'invalid id' })
  }
  const deleteReservation  = await Reservations.deleteReservationById(id)
  if(deleteReservation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({  error: deleteReservation.error, message: deleteReservation.message })
  }
  return res.status(StatusCodes.OK).json({ message: `deleteReservation` })
}
const updateReservation = async (req, res) => {
  return  res.status(StatusCodes.OK).json({ message: `updateReservation` })
}
module.exports = {
  updateReservation,
  getReservations,
  getSingleReservation,
  deleteReservation,

  createReservation
}
