const express = require("express");
const router = express.Router();


const authController = require('../controllers/authController')


router.get('/', authController.index)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

router.get('/register', authController.register_get)

router.post('/register', authController.register_post)


module.exports = router