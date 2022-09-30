require('dotenv').config()
require('express-async-errors')

const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require('fs')

const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middlewares/errorHandler')
const { logger, logEvents } = require('./middlewares/logger')

const app = express()

// db
connectDB()

// middlewares
app.use(logger)
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors(corsOptions))

// routes
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

// wrong endpoint
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

// error handler
app.use(errorHandler)

// port
const PORT = process.env.PORT || 8000
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log',
  )
})
