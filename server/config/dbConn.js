const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE)
  } catch (err) {
    console.log('DB CONNECTION ERR', err)
  }
}

module.exports = connectDB
