// Create the routes here and then pass to the Routes, which will create the endpoints and pass to the app.js

const User = require("../models/User");

//Handle errors // Function to catch the error and return the especific error 
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered '
        return errors
    }

    //Validation errors
    if(err.message.includes("user validation failed")) {
        console.log(Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        }))
    }
    return errors
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password});
        res.status(201).json({ user })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    // console.log(req.body) //Catch the json that we send with the postman (email and password) because we use express.json in app.js
    const { email, password } = req.body;
    console.log(email, password)
    res.send('user login')
}





// Just for funny haha
module.exports.get_all = async (req, res) => {
    try {
        let allUsers = await User.find()
        res.status(200).json({allUsers})
    } catch (err) {
        console.log(err)
    }
}


module.exports.delete = async (req, res) => {
    try{
        let deleteUser = await User.findByIdAndRemove(req.params.id);
        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).json({err})
    }
}