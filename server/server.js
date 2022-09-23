require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require('fs')
const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')

// app
const app = express()

// db
connectDB()

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors(corsOptions))

// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))
