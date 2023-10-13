const express = require('express')
const userController = require('../controllers/userController')
const router  = express.Router()

router
    .route('/login')
    .get(userController.loginPage)
    .post(userController.loginUser)

router
    .route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser)

router
    .route('/logout')
    .get(userController.logoutUser)

module.exports = router