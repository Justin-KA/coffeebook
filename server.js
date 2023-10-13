require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const coffeeRoutes = require('./routes/coffeeRoutes')
const userRoutes = require('./routes/userRoutes')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/userModel')
const session = require('express-session')

const PORT = process.env.PORT || 3500

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'this is CoffeeBook',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//passing current user info to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.use('/', coffeeRoutes)
app.use('/', userRoutes)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})