const Router = require('express')
const router = new Router()
const carRouter = require('./carRouter')
const factoryRouter = require('./factoryRouter')


router.use('/cars', carRouter)
router.use('/factories', factoryRouter)


module.exports = router