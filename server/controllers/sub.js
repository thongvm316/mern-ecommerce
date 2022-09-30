const Sub = require('../models/sub')
const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
  const { name, parent } = req.body
  res.json(await new Sub({ name, parent, slug: slugify(name) }).save())
} // done

exports.list = async (req, res) =>
  res.json(await Sub.find({}).sort({ createdAt: -1 })) // done

exports.read = async (req, res) => {
  const sub = await Sub.findOne({ slug: req.params.slug })
  const products = await Product.find({ subs: sub }).populate('category')

  res.json({
    sub,
    products,
  })

  /* 
   Product
    1. Has one category
    2. Can have many subs:
      a. Category: Apple
      b. Subs: Iphone, Ipad, Macbook, AirPort...

    Analyze logic read
      1. Params: slug = macbook --> got sub
      2. Use it to find in product
  */
} // done

exports.update = async (req, res) => {
  const { name, parent } = req.body

  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug }, // filter
      { name, parent, slug: slugify(name) }, // new val
      { new: true },
    )

    if (!updated) {
      res.status(400).json('Sub does not exist')
      return
    }

    res.json(updated)
  } catch (err) {
    res.status(400).send('Sub update failed')
  }
} // done

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug })
    console.log(
      '🚀 ~ file: sub.js ~ line 52 ~ exports.remove= ~ deleted',
      deleted,
    )
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Sub delete failed')
  }
}
