const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/users')
const bcrypt = require('bcryptjs')
require ('dotenv').config()

const secretKey = process.env.JWT_SECRET


const options = {
    jtwFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    algorithms: ['HS256']
};

const strategy = new jwtStrategy(options, (payload, done) => {

    User.findById(payload.id)
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => done(err, null))
})

module.exports = (passport) => {
    passport.use(strategy)
};