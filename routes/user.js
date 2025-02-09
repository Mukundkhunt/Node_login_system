const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// User model
const User = require('../models/User')

// Login Page
router.get('/login', (req,res) => res.render('login'))

// Register Page
router.get('/register', (req,res) => res.render('Register'))

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2} = req.body
    let errors = []

    // Check required Fields
    if(!name || !email || !password || !password2){
        errors.push({ msg : 'Please fill in all fields'})
    }
    // Check Password Match
    if(password !== password2){
        errors.push({ msg : 'Password do not match'})
    }

    // Check Pass length
    if(password.length < 6){
        errors.push({ msg : 'Password should be at least 6 chracters'})
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else{
        // Validation passed
        User.findOne({
            email : email
        }).then(user => {
            if(user){
                // User exists
                errors.push({ msg : 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                newUser.save().then((result)=>{
                    console.warn(result)})
                    .catch(err => console.warn(err))
                res.send('Hello')
            }
        })
    }
})

module.exports = router