const express = require('express')

const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  deleteUser
} = require('../controllers/userController')

router.get('/getAllUsers', getAllUsers)
router.get('/:id', getSingleUser)
router.delete('/:id', deleteUser)

module.exports = router
