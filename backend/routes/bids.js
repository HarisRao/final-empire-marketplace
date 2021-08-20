var express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
const Bid = require('../models/bid');
const Auction = require('../models/auction');
var router = express.Router();
var cors = require('./cors');
var authenticate = require('../authenticate');

router.use(express.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });


router.get('/', cors.corsWithOptions, async (req, res, next) => {
    const bids = await Bid.find({}).populate('bidder', 'address username profilepic');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, bids: bids});
})

router.post('/', cors.corsWithOptions, async (req, res, next) => {
    const item_id = req.body.item_id;
    const address = req.body.address;
    const price = req.body.price;
    const usr = await User.findOne({address: address});
    const auct = await Auction.findOne({item_id: item_id, status: true});
    const itemm = await Item.findOne({_id: item_id}).populate('highestBid');

    if (usr._id.equals(itemm.owner)){
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Owner of item cannot place a bid!'});    
    }
    else if (auct.highestBid){
        const highestBid = await Bid.findById(auct.highestBid);
        if (highestBid.owner === usr._id){
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: 'Highest bidder cannot place a bid!'});        
        }
        else{
            const prevBid = await Bid.findOne({bidder: usr._id, auction_id: auct._id, withdrawn: false});
            console.log(prevBid);
            if (prevBid){
                var totalBid = parseInt(price) + parseInt(prevBid.price);
                if (parseInt(highestBid.price) < totalBid){
                    const updated_bid = await Bid.findOneAndUpdate({_id: prevBid._id}, {$set: {price: totalBid}}, {new: true});
                    await Auction.findOneAndUpdate({_id: auct._id}, {$set: {highestBid: updated_bid._id}}, {new: true});
                    const updated_auct = await Auction.findById(auct._id).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});
                    const bidd = await Bid.findOne({_id: updated_bid._id}).populate('bidder', 'address username profilepic');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, updated_auction: updated_auct, bid: bidd, new_bid: false, user: usr});
                }
                else{
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, status: `Highest Bid is ${highestBid.price}, your bid value was ${totalBid}. Please place a higher bid!`});
                }
            }
            else{
                if (parseInt(highestBid.price) < parseInt(price)){
                    const bid_new = await Bid.create({price: price, item_id: item_id,  bidder: usr._id, auction_id: auct._id, withdrawn: false, ended: false});
                    await Auction.findOneAndUpdate({_id: auct._id}, {$set: {highestBid: bid_new._id}}, {new: true});
                    const updated_auct = await Auction.findById(auct._id).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});
                    const bidd = await Bid.findOne({_id: bid_new._id}).populate('bidder', 'address username profilepic');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, updated_auction: updated_auct, bid: bidd, new_bid: true, user: usr});
                }
                else{
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, status: `Highest Bid is ${highestBid.price}, your bid value was ${price}. Please place a higher bid!`});
                }
            }
        }
    }
    else{
        if (parseInt(price) > parseInt(itemm.price)){
            var bid_new = await Bid.create({price: price, item_id: item_id, bidder: usr._id, auction_id: auct._id, withdrawn: false, ended: false});
            await Auction.findOneAndUpdate({_id: auct._id}, {$set: {highestBid: bid_new._id}}, {new: true});
            const updated_auct = await Auction.findOne({_id: auct._id}).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});
            const bidd = await Bid.findOne({_id: bid_new._id}).populate('bidder', 'address username profilepic');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, updated_auction: updated_auct, bid: bidd, new_bid: true, user: usr});
        }
        else{
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: `Asking price is ${itemm.price}, your bid value was ${price}. Please place a higher bid!`});
        }
    }
})

module.exports = router;