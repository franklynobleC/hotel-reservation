const express = require('express')

const router = express.Router()

const {
  createRooms,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom
} = require('../controllers/roomsController')

router.post('/createRoom', createRooms)
router.put('/:id', updateRoom)
router.get('/:id', getSingleRoom)
router.delete('/:id', deleteRoom)
router.get('/getRooms', getAllRooms)

module.exports = router
