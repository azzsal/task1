const Item = require('../models/item')

const addItem = async (request, response, next) => {
  const body = request.body

  try {
    const item = new Item({
      name: body.name,
      description: body.description,
      picturePath: body.picturePath
    })
    const savedItem = await item.save()
    response.status(201).json(savedItem)
  } catch (error) {
    next(error)
  }
}

const getAllItems = async (request, response) => {

  const { page = 1, limit = 10 } = request.query

  const items = await Item.find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()

  response.json(items)
}

const getItem = async (request, response, next) => {
  try {
    const item = await Item.findById(request.params.id)
    if (!item) {
      return response.status(404).end()
    }
    response.json(item)
  } catch (error) {
    next(error)
  }
}

const updateItem = async (request, response, next) => {
  const body = request.body

  try {
    const item = await Item.findById(request.params.id)

    if (!item) {
      return response.status(404).end()
    }

    item.name = body.name
    item.description = body.description
    item.picturePath = body.picturePath
    await item.save()
    next(error)

    response.json(item)
  } catch (error) {
    next(error)
  }

}

const deleteItem = async (request, response, next) => {
  try {
    const item = await Item.findById(request.params.id)
    if (!item) {
      response.status(404).end()
    }

    await Item.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (error) {
    next(error)
  }

}

module.exports = {
  addItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem
}