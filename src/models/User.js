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

const User = mongoose.model("user", userSchema)

module.exports = User;