const Router = require('express')
const router = new Router()
const factoryController = require('../controllers/factoryController')


router.get('/', factoryController.getAllFactories)
router.get('/:id', factoryController.getOneFactory)
router.post('/', factoryController.createFactory)
router.put('/:id', factoryController.putFactory)
router.patch('/:id', factoryController.patchFactory)
router.delete('/:id', factoryController.deleteFactory)

module.exports = router