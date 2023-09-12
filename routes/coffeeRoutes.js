const express = require('express')
const coffeeController = require('../controllers/coffeeController')
const router  = express.Router()

router
    .route('/')
    .get(coffeeController.getAllCoffees)

router
    .route('/upload')
    .get(coffeeController.uploadPage)
    .post(coffeeController.upload.single('image'), coffeeController.createCoffee)

router
    .route('/edit/:id')
    .get(coffeeController.editPage)
    .post(coffeeController.updateCoffee)

router
    .route('/delete/:id')
    .post(coffeeController.deleteCoffee)

module.exports = router