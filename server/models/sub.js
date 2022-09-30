const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
)

/* 
  Parent:
    1. Call API, send payload: name, parent(id category)
    2. Server store this payload
    3. Any time, when read slug, can populate to get category
*/

module.exports = mongoose.model('Sub', subSchema)
