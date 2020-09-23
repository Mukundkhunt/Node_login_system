const express = require('express')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()



// DB Config
const db = require('./config/keys').MongoURI
// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => console.log("Mongodb Connected...")
).catch(err => console.log(err))


// EJS
app.use(expressLayout)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on localhost:${PORT}`))