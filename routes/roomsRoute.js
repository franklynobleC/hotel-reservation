const express = require('express')

const router = express.Router()

const {
  createRooms,
  getAllRooms,
  getSingleRoom,
  deleteRoom
} = require('../controllers/roomsController')

router.post('/createRoom', createRooms)
router.put('/updateRoom')

module.exports = router
