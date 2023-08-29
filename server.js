require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})