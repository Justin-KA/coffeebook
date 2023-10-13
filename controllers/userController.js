const passport = require("passport");
const User = require('../models/userModel')

const loginPage = (req, res) => {
    res.render('login', {user: req.user})
}

const registerPage = (req, res) => {
    res.render('register', {user: req.user})
}

const loginUser = passport.authenticate('local', {
successRedirect: '/',
failureRedirect: '/login',
failureFlash: false
})

const registerUser = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = new User({username})
        await User.register(user, password)
        passport.authenticate('local')(req, res, function() {
            res.redirect('/')
        })

    } catch (error) {
        console.log(error)
        res.redirect('/register')
    }
}

const logoutUser = (req, res) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    })
}

module.exports ={
    loginUser,
    loginPage,
    loginUser,
    registerUser,
    registerPage,
    logoutUser
}