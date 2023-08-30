const mongoose = require("mongoose")

const coffeeSchema = new mongoose.Schema({
    pattern: String,
    blurb: String,
    image: String
})

module.exports = mongoose.model('Coffee', coffeeSchema)