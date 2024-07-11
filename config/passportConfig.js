const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/users')
const bcrypt = require('bcryptjs')
require ('dotenv').config()

const secretKey = process.env.JWT_SECRET


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    algorithms: ['HS256']
};

const strategy = new JWTStrategy(options, (payload, done) => {

    User.findById({ _id: payload.id })
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => done(err, null))
})

passport.use(strategy)

module.exports = passport