var express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
const Bid = require('../models/bid');
const Transaction = require('../models/transaction');
var router = express.Router();
var cors = require('./cors')

router.use(express.json());

router.get('/', cors.corsWithOptions, async (req, res, next) => {
    const transactions = await Transaction.find({}).populate('seller', 'address').populate('buyer', 'address');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, transactions: transactions});
})


module.exports = router;