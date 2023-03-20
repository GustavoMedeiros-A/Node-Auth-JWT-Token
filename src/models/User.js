const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"] // Validate email
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Minimum password lenght is 6 characters"],        
    },
})

// fire function after doc saved to database
userSchema.post('save', function (doc, next) {
    console.log('new user was created and saved', doc)
    next()
})
//Use next to go to the next middleware

//fire a function before doc saved to db
userSchema.pre('save', function(next) {
    console.log("user about to be created and saved", this)
    next()
})


const User = mongoose.model("user", userSchema)

module.exports = User;