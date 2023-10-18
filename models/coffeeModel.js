const mongoose = require("mongoose")

const coffeeSchema = new mongoose.Schema({
    name: String,
    blurb: String,
    image: String,
    cloudinaryID: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Coffee', coffeeSchema)