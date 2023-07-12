const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  picturePath: {
    type: String,
    validate: {
      validator: (path) => {
        return (/(.+\.(png|jpg|jpeg)$)/).test(path);
      },
      message: `picture path must end in .png, .jpg or .jpeg`
    }
  }
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item