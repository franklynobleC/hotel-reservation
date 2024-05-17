const { StatusCodes } = require('http-status-codes')
const { response } = require('express')

const { dbPool, sql } = require('../db/connectDb')

const createReservation = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: `create reservation` })
}

const getReservations = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: `get reservations` })
}

const getSingleReservation = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: `get SingleReservation` })
}
const deleteReservation = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: `deleteReservation` })
}
const updateReservation = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: `updateReservation` })
}
module.exports = {
  updateReservation,
  getReservations,
  getSingleReservation,
  deleteReservation,
  deleteReservation,
  createReservation
}
