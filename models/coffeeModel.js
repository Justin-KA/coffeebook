const mongoose = require("mongoose")

const coffeeSchema = new mongoose.Schema({
    name: String,
    blurb: String,
    image: String
})

module.exports = mongoose.model('Coffee', coffeeSchema)