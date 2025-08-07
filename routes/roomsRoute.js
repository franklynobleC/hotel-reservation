const express = require('express')

const router = express.Router()

const {
  createRooms,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom
} = require('../controllers/roomsController')




router.put('/:id', updateRoom)
router.post('/createRoom', createRooms)

router.delete('/:id', deleteRoom)
router.get('/getRooms', getAllRooms)
router.get('/:id', getSingleRoom)






module.exports = router
