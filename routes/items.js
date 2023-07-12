const itemsController = require('../controllers/items')
const itemsRouter = require('express').Router()

itemsRouter.post('/', itemsController.addItem)

itemsRouter.get('/', itemsController.getAllItems)

itemsRouter.get('/:id', itemsController.getItem)

itemsRouter.put('/:id', itemsController.updateItem)

itemsRouter.delete('/:id', itemsController.deleteItem)

module.exports = itemsRouter