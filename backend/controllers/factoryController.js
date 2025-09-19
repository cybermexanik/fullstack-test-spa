const { QueryTypes } = require('sequelize')
const {Factory} = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/ApiErrors')


class FactoryController {

    async createFactory (req, res, next) {
        try {

            const {factory_title, annual_income, employees_qty, foundation_date} = req.body
            const factory = await Factory.create ({factory_title, annual_income, 
                employees_qty, foundation_date})

            return res.json(factory)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAllFactories (req, res, next) {
        try{

            let offset = parseInt(req.query.offset) || 0;
            let limit = parseInt(req.query.limit) || 5;

            const factories = await sequelize.query(
                'SELECT * FROM factories ORDER BY id ASC LIMIT :limit OFFSET :offset',
                {
                    replacements: {limit, offset},
                    type: QueryTypes.SELECT
                }
            )

            const totalFactories = await sequelize.query(
                'SELECT COUNT(*) AS count FROM factories',
                {type: QueryTypes.SELECT}
            )

            return res.json({
                rows: factories,
                totalFactories: totalFactories[0]
            })
            
        } catch (error){
            next(ApiError.badRequest(error.message))
        }
    }

    async getOneFactory (req, res, next) {
        try{

            const {id} = req.params
            const factory = await sequelize.query(
                'SELECT * FROM factories WHERE id = :id',
                {
                    replacements: {id},
                    type: QueryTypes.SELECT
                }
            )

            if(factory.length === 0) {
                return next(ApiError.notFound('Завод не найден'))
            }

            return res.json(factory[0])

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async putFactory (req, res, next) {
        try{

            const {id} = req.params
            const newInfo = req.body

            const factory = await Factory.findByPk(id)

            if(!factory){
                return next (ApiError.notFound('Завод не найден'))
            }

            await factory.update(newInfo)

            return res.json(
                {
                    success: true,
                    message: 'Данные о заводе изменены!'
                }
            )

        } catch(error){
            next(ApiError.badRequest(error.message))
        }
    } 

    async patchFactory(req, res, next) {
        try{

            const {id} = req.params
            const newField = req.body

            const factory = await Factory.findByPk(id)

            if(!factory){
                return next (ApiError.notFound('Завод не найден'))
            }

            await factory.update(newField)

            return res.json(factory) 

        } catch(error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteFactory (req, res, next) {
        try{

            const {id} = req.params
            const factory = await sequelize.query(
                'DELETE FROM factories WHERE id = :id',
                {
                    replacements: {id},
                    type: QueryTypes.DELETE
                }
            )

            return res.json(
                {
                    success: true,
                    message: 'Завод был удален!'
                }
            )

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new FactoryController()