// Create the routes here and then pass to the Routes, which will create the endpoints and pass to the app.js

const User = require("../models/User");

//Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let error = { email: '', password: '' }

    //Validation errors
    if(err.message.includes("user validation failed")) {
        console.log(Object.values(err.errors).forEach(error => {
            console.log(error.properties)
        }))
    }
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
        res.status(400).send("error, user not created")
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
