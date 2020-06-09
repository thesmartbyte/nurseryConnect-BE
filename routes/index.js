const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const ProductCtrl = require('../controllers/product-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const NurseryCtrl = require('../controllers/nursery-ctrl')
const StockCtrl = require('../controllers/stock-ctrl')
const CustomerCtrl = require('../controllers/customer-ctrl')
const CustomerTxnCtrl = require('../controllers/customer-txn-ctrl')

// product routes
router.post('/product', ProductCtrl.createProduct)
router.put('/product/:id', ProductCtrl.updateProduct)
router.delete('/product/:id', ProductCtrl.deleteProduct)
router.get('/product/:id', ProductCtrl.getProductById)
router.get('/products', ProductCtrl.getProducts)

// user routes
router.post("/user/signup", UserCtrl.userSignup)
router.post("/user/login", UserCtrl.passwordLogin)
router.get("/user/me", auth, UserCtrl.userDetails)
router.get("/users", UserCtrl.getUsers)

// nursery routes
router.post("/nursery/signup", NurseryCtrl.nurserySignup)
router.get("/nurseries", NurseryCtrl.getNurseries)
router.get("/nursery/:id", NurseryCtrl.getNurseryById)

//stock routes
router.post('/stock', StockCtrl.createStock)
router.put('/stock/:id', StockCtrl.updateStock)
router.delete('/stock/:id', StockCtrl.deleteStock)
router.get('/stocks', StockCtrl.getStocks)
router.get('/stock/:id', StockCtrl.getstockById)
router.get('/stock/nursery/:id', StockCtrl.getNurseryStock)

//customer routes
router.post('/customer', CustomerCtrl.customerSignUp)
router.get('/customer/:id', CustomerCtrl.getCustomerById)

//customer Transaction routes
router.post('/cust-txn', CustomerTxnCtrl.createCustTxn)
router.get('/cust-txn/:id', CustomerTxnCtrl.getCustTxnById)

module.exports = router;