const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists & is verified

    if (token) {
        
    } else {
        res.redirect('/login')
    }

}