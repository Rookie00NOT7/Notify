const express = require('express')
const cors = require('cors')
require('dotenv').config()


// Require Router Handlers
const app = express()


//DB connection 
const url = require('./config/DBconfig')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true})
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up on ${port} 👍`))