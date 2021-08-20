var express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
const Bid = require('../models/bid');
const Auction = require('../models/auction');
var router = express.Router();
var cors = require('./cors')

router.use(express.json());

router.get('/', cors.corsWithOptions, async (req, res, next) => {
    const auctions = await Auction.find({}).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, auctions: auctions});
})


module.exports = router;