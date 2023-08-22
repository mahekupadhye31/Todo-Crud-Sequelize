const {signup,login,upload} = require('../controller/user')
const express = require('express')
const {check}= require('express-validator');
const router = express.Router()

router.post('/signup', [
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 })
],signup)
router.post('/login',login)
router.post('/upload', upload);


module.exports = router;