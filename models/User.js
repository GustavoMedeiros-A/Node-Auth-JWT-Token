const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

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
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();  
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email }); //Find the user email in database
    if(user) { //Check if the email is the right one
        const auth = await bcrypt.compare(password, user.password) // compare the password against the password stored in database
        if(auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const User = mongoose.model("user", userSchema)

module.exports = User;