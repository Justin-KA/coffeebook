const Coffee = require('../models/coffeeModel')
const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

const upload = multer({storage: storage})

const getAllCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find().populate('owner')
        res.render('home', {coffees: coffees, user: req.user})
    } catch (error) {
        console.log(error)
    }
}


const uploadPage = (req, res) => {
    res.render('upload', {user: req.user})
}

const createCoffee = async (req, res) => {
    try {
        const coffee = new Coffee({
            name: req.body.name,
            blurb: req.body.blurb,
            image: req.file.filename, //multer places the file infor in the req.file
            owner: req.user._id
       })

       await coffee.save()
       res.redirect('/')

    } catch (err) {
        console.log(err)
    }
}

const editPage = async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id)
        res.render('edit', {coffee:coffee, user: req.user})
    } catch (error) {
        console.log(error)
    }
}

const updateCoffee = async (req, res) => {
    try {
        let coffee = await Coffee.findById(req.params.id)
        if(coffee.owner.equals(req.user._id)){
            await Coffee.findByIdAndUpdate(req.params.id, req.body)
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

const deleteCoffee = async (req, res) => {
    try {
        let coffee = await Coffee.findById(req.params.id)
        if(coffee.owner.equals(req.user._id)){
            await Coffee.findByIdAndRemove(req.params.id)
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllCoffees,
    upload,
    uploadPage,
    createCoffee,
    editPage,
    updateCoffee,
    deleteCoffee
}