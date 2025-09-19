const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')


router.get('/', carController.getAllCars)
router.get('/:id', carController.getOneCar)
router.post('/', carController.createCar)
router.put('/:id', carController.putCar)
router.patch('/:id', carController.patchCar)
router.delete('/:id', carController.deleteCar)

module.exports = router