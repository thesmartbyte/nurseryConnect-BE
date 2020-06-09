const CustomerTxn = require('../models/customer-txn-model')
const Customer = require('../models/customer-model')
const Stock = require('../models/stock-model')

createCustTxn = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide transaction details!',
        })
    }
    let customer = await Customer.findOne({
        mobile: body.mobile
    });
    if (!customer) {
        const custBody = {
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
            mobile: body.mobile,
            email: body.email
        }
        customer = new Customer(custBody);
        if (!customer) {
            return res.status(400).json({ success: false, error: err })
        }
        await customer.save()
    }
    body.customerId = customer._id;
    customerTxn = new CustomerTxn(body);
    customerTxn.save().then( async ()=> {
        await Stock.find({ nurseryId: body.nurseryId }, (err, stock) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!stock) {
                return res
                    .status(404)
                    .json({ success: false, error: 'stock not found!' })
            }
            const newStock = [];
            body.products.forEach((product)=>{
                let i = stock[0].stock.findIndex(x => x.prd_id === product.prd_id);
                stock[0].stock[i].qty -= product.qty;
                newStock[i] = {};
                newStock[i].qty = stock[0].stock[i].qty;
                newStock[i].prc = stock[0].stock[i].prc;
                newStock[i].prd_id = stock[0].stock[i].prd_id;
            })
            
            const tempStock = new Stock({
                nurseryId : body.nurseryId,
                updatedBy: body.userId,
                stock: newStock,
                saleTxnId: customerTxn._id
            })
            tempStock.save().then(() => {
                return res.status(201).json({
                  success: true,
                  id: customerTxn._id,
                  message: 'Transaction recorded successfully with stock updation!',
                })
            })
            .catch(error => {
                CustomerTxn.findOneAndDelete({ _id: customerTxn._id }, (err, x) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
                }).catch(err => console.log(err))

                return res.status(400).json({
                    error,
                    message: 'Transaction recorded successfully but reverted!',
                })
            })
        }).sort({_id:-1}).limit(1)
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Transaction not recorded!',
        })
    })
}

getCustTxnById = async (req, res) => {
    await CustomerTxn.findOne({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: 'Customer Transaction not found!' })
        }
        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

module.exports = {
    createCustTxn,
    getCustTxnById,
}