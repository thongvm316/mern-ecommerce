const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE)
    console.log('Connected to database')
  } catch (err) {
    console.log('DB CONNECTION ERR', err)
  }
}

module.exports = connectDB
