const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Factory = sequelize.define('factories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    factory_title: {type: DataTypes.STRING(255)},
    annual_income: {type: DataTypes.DECIMAL(15, 2)},
    employees_qty: {type: DataTypes.INTEGER},
    foundation_date: {type: DataTypes.DATE}
}, {timestamps: true})

const Car = sequelize.define('cars', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    car_brand: {type: DataTypes.STRING(255)},
    price: {type: DataTypes.DECIMAL(10,2)},
    doors_qty: {type: DataTypes.INTEGER, defaultValue: 4},
    manufacturer_date: {type: DataTypes.DATE},
    factory_id: {type: DataTypes.INTEGER}
}, {timestamps: true})

Factory.hasMany(Car, {foreignKey: 'factory_id'})
Car.belongsTo(Factory, {foreignKey: 'factory_id'})

module.exports = {
    Factory,
    Car
}