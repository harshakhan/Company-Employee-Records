const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 265,
    },
    department: {
        type: String,
        required: true,
        min: 2,
        max: 265
    },
    gender: {
        type: String,
        required: true,
        min: 1,
        max: 1
    },
    joining_date: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },
    payment:
        [
            {
                amount: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 100
                },
                date: {
                    type: Date,
                    default: new Date(),
                    required: true
                }
            }
        ]
})

module.exports = mongoose.model('Employee', employeeSchema)
