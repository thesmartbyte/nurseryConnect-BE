const Customer = require('../models/customer-model')

customerSignUp = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide customer details!',
        })
    }
    const customer = new Customer(body)
    if (!customer) {
        return res.status(400).json({ success: false, error: err })
    }

    customer
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: customer._id,
                message: 'Customer created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Customer not created!',
            })
        })
}

getCustomerById = async (req, res) => {
    await Customer.findOne({ mobile: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: 'Customer not found!' })
        }
        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

module.exports = {
    customerSignUp,
    getCustomerById,
}