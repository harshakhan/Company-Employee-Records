const express = require("express");
const router = express.Router();
const Employee = require('../models/Employee')
const { employeeValidator } = require('../validation')

router.post('/', async (req, res) => {
    const validationError = employeeValidator(req.body)
    if (validationError) return res.status(400).json({ message: validationError.details[0].message })
    try {
        const newUser = await Employee({ ...req.body }).save()
        res.json({message: "Employee Added"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {

    let page = req.query.page || 1
    let limit = req.query.limit || 20
    let query = req.query.query || ''

    page = Number(page)
    limit = Number(limit)
    const startIndx = (page - 1) * limit

    try {
        const results = { page, limit }
        results.totalResults = await Employee.countDocuments()
        results.totalPages = Math.ceil(results.totalResults / limit)

        results.data = await Employee.find({ name: { $regex: `${query}`, $options: 'i' } }).skip(startIndx).limit(limit)
        res.json(results)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findById(id)
        res.json(employee.payment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/addPayment', async (req, res) => {
    try {
        Employee.update({ _id: req.body.id }, {
            $push: {
                payment: {
                    amount: req.body.amount,
                    date: req.body.date,
                }
            }
        })
        .then(resp=>{
            res.json({message: "Added the Amount"})
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router