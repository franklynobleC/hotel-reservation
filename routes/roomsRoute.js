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
router.get('/getRooms', getAllRooms)
router.put('/:id', updateRoom)
router.get('/:id', getSingleRoom)
router.delete('/:id', deleteRoom)

module.exports = router
