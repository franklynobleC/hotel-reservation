const { StatusCodes } = require('http-status-codes')
const { response } = require('express')

const { dbPool, sql } = require('../db/connectDb')
const Reservations = require("../queries/reservations");

const createReservation = async (req, res) => {
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
