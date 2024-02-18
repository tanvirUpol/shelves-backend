const express = require('express')
const router = express.Router()

const { tokenVerify } = require('../utilities/tokenVerify')

const {
      register,
      login,
      users,
      deletedUsers,
      userPreferences,
      user,
      update,
      changePass,
      getAllPickerPacker
} = require('../controllers/userController')

router.post('/', register) // Create an user
router.post('/login', login) // Login
router.get('/', tokenVerify, users) // Get all users
router.get('/pickerpacker', tokenVerify, getAllPickerPacker) // Get all users
router.get('/deleted', tokenVerify, deletedUsers) // Get all deleted users
router.patch('/changepass/:id', tokenVerify, changePass) // Get all deleted users
router.get('/:id', tokenVerify, user) // Get single user
router.patch('/:id', tokenVerify, update) // Update single user

module.exports = router