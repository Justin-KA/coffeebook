const express = require('express')
const coffeeController = require('../controllers/coffeeController')
const router  = express.Router()

router
    .route('/')
    .get(coffeeController.getAllCoffees)

// router
//     .route('/upload')
//     .get(coffeeController.uploadPage)

// router
//     .route('/edit/:id')
//     .get(coffeeController.updateCoffee)

// router
//     .route('/delete/:id')
//     .post(coffeeController.deleteCoffee)

module.exports = router