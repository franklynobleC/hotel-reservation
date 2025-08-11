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
  return res.status(StatusCodes.OK).json({ message: `get SingleReservation` })
}
const deleteReservation = async (req, res) => {
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
