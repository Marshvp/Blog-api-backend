const User = require('../models/users')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET



exports.index = asyncHandler(async (req, res, next) => {
    res.json('index')
})

exports.login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const payload = {
            id: user._id,
            username: user.name
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
        // console.log("this is the token", token);
        return res.json({ 
            message: 'Login successful', 
            token: 'Bearer ' + token, 
            id: user._id, 
            username: user.name, 
            admin: user.admin
        });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.json('logout')
})


exports.register_get = asyncHandler(async (req, res, next) => {
    res.json('register get')
})

exports.register_post = asyncHandler(async (req, res, next) => {
    // console.log("req.body",req.body);
    const name = req.body.username;
    const password = req.body.password;
    // console.log(name, password);
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name: name,
        password: hashedPassword,
        admin: true
    })
    await user.save()

    res.json({message: 'user created'})
})

exports.check_token = asyncHandler(async (req, res, next) => {
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Pad single digits with leading zero
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }
    // console.log("hit check token");
    // console.log("timestamp", getCurrentTime());
    // console.log(req.user);
    res.json({ message: 'Token is valid',
    })
})