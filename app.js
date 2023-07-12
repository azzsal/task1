require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const itemsRouter = require('./routes/items')

// app creation
const app = express()


// database connection
mongoose.set('strictQuery', false)
console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// middleware functions
app.use(cors())
app.use(express.json())

// middleware routes
app.use('/items', itemsRouter)

// error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

