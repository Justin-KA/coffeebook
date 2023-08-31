const Coffee = require('../models/coffeeModel')

const getAllCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find()
        res.render('home', {coffees: coffees})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllCoffees
}