const { QueryTypes } = require('sequelize')
const {Car} = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/ApiErrors')


class CarController {

    async createCar (req, res, next) {
        try{

            const { car_brand, price, doors_qty, manufacturer_date, factory_id } = req.body
            const car = await Car.create({ car_brand, price, doors_qty, 
                manufacturer_date, factory_id })

            return res.json(car)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAllCars (req, res, next) {
        try{

            let offset = parseInt(req.query.offset) || 0;
            let limit = parseInt(req.query.limit) || 5;

            const cars = await sequelize.query(
                'SELECT * FROM cars ORDER BY id ASC LIMIT :limit OFFSET :offset',
                {
                    replacements: {limit, offset},
                    type: QueryTypes.SELECT
                }
            )

            const totalCars = await sequelize.query(
                'SELECT COUNT(*) AS count FROM cars',
                {type: QueryTypes.SELECT}
            )

            return res.json({
                rows: cars,
                totalCars: totalCars[0]
            })
            
        } catch (error){
            next(ApiError.badRequest(error.message))
        }
    }

    async getOneCar (req, res, next) {
        try{

            const {id} = req.params
            const car = await sequelize.query(
                'SELECT * FROM cars WHERE id = :id',
                {
                    replacements: {id},
                    type: QueryTypes.SELECT
                }
            )

            if(car.length === 0) {
                return next(ApiError.notFound('Автомобиль не найден'))
            }

            return res.json(car[0])

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async putCar (req, res, next) {
        try{

            const {id} = req.params
            const newInfo = req.body

            const car = await Car.findByPk(id)

            if(!car){
                return next (ApiError.notFound('Автомобиль не найден'))
            }

            await car.update(newInfo)

            return res.json(
                {
                    success: true,
                    message: 'Данные об автомобиле изменены!'
                }
            )

        } catch (error){
            next(ApiError.badRequest(error.message))
        }
    }

    async patchCar(req, res, next) {
        try {

            const {id} = req.params
            const newField = req.body

            const car = await Car.findByPk(id)

            if(!car) {
                return next (ApiError.notFound('Автомобиль не найден'))
            }

            await car.update(newField)
    

            return res.json(car)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteCar (req, res, next) {
        try{

            const {id} = req.params
            const car = await sequelize.query(
                'DELETE FROM cars WHERE id = :id',
                {
                    replacements: {id},
                    type: QueryTypes.DELETE
                }
            )

            return res.json(
                {
                    success: true,
                    message: 'Автомобиль был удален!'
                }
            )

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new CarController()