const Category = require('../models/category')
const Product = require('../models/product')
const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body

    res.json(await new Category({ name, slug: slugify(name) }).save())
  } catch (err) {
    next(err) // ! no need, mongoose auto send error to express middleware server
  }
} // done

exports.list = (req, res) => {
  Category.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, result) {
      if (err) throw err
      return res.json(result)
    })
} // done

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug })
  const products = await Product.find({ category }).populate('category')
  /* 
     category: {
      type: ObjectId,
      ref: 'Category',
    } --> In Product Schema, so can can use category to find products
  */

  res.json({
    category,
    products,
  })
} // done

exports.update = async (req, res) => {
  const { name } = req.body

  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug }, // query
      { name, slug: slugify(name) }, // update
      { new: true }, // set the new option to true to return the document after update was applied.
    )

    res.json(updated)
  } catch (err) {
    res.status(400).send('Category update failed')
  }
} // done

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Category delete failed')
  }
} // done

exports.getSubs = (req, res, next) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) {
      return next(err)
    }
    res.json(subs)
  })
} // Done

/* 
  Test index slug with 1 million data
  What is diff btw MongoDB Drive and Mongoose? // Done
*/
