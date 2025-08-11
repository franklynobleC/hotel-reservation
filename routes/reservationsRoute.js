const express = require('express')
const {
  deleteReservation,
  getReservations,
  updateReservation,
  createReservation,
  getSingleReservation
} = require('../controllers/reservationController')

const router = express.Router()
router.post('/createReservation', createReservation)
router.get('/getReservations', getReservations)
router.put('/:id', updateReservation)
router.get('/:id', getSingleReservation)
router.delete('/:id', deleteReservation)

module.exports = router
