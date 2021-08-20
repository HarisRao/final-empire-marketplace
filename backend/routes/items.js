var express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
var router = express.Router();
var cors = require('./cors')
var multer = require('multer');
var crypto = require('crypto');
const Transaction = require('../models/transaction');
const Auction = require('../models/auction');
const Bid = require('../models/bid');
const authenticate = require('../authenticate');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, 'public/nfts');
    },
    filename: (req, file, cb) => {
        console.log(file)
        const code = crypto.randomBytes(4).toString('hex');
        cb(null, `img_${code}.${file.originalname.split('.')[1]}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    console.log(file)
    // if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
    //     return cb(new Error('You can upload only image files!'), false);
    // }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

router.use(express.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

router.get('/', cors.corsWithOptions, async (req, res, next) => {
  const itemsForSale = await Item.find({status: {$ne: '0'}}).populate('owner', 'address username profilepic');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, items: itemsForSale});
});

router.get('/:address', cors.corsWithOptions, async (req, res, next) => {
  const usr = await User.findOne({address: req.params.address});
  const itemsForSale = await Item.find({owner: usr._id, status: '0'}).populate('owner', 'address username profilepic');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, items: itemsForSale});
});

router.post('/:address', cors.corsWithOptions, upload.single('nftImage'), authenticate.signatureValid, async (req, res, next) => {
  const address = req.params.address;
  const name = req.body.name;
  const description = req.body.description;
  const token_uri = req.body.token_uri;
  const image_ipfs = req.body.image_ipfs;
  const category = req.body.category;
  const nftType = req.body.nftType;
  const collection_id = req.body.collection_id;
  const usr = await User.findOne({address: address});

  var a = req.file.path.split(`public`)[1]; 
  console.log({name: name, description: description, image_local: a, owner: usr._id, image_ipfs: image_ipfs, token_uri: token_uri, status: "0", category, nft_type: nftType, collection_id: collection_id})
  const itemCreated = await Item.create({name: name, description: description, image_local: a, owner: usr._id, image_ipfs: image_ipfs, token_uri: token_uri, status: "0", category: category, nft_type: nftType, collection_id: collection_id});
  const itemToSend = await Item.findOne({_id: itemCreated._id}).populate('owner', 'address username profilepic');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, item: itemToSend, user: usr});
})

router.put('/minted', cors.corsWithOptions, async (req, res, next) => {
  const address = req.body.address;
  const token_id = req.body.id;
  const nft_id = req.body.nft_id;
  const txHash = req.body.txHash;
  const usr = await User.findOne({address: address});
  const updated_item = await Item.findOneAndUpdate({owner: usr._id, _id: token_id}, {$set: {minted: true, nft_id: nft_id}}, {new: true});
  const itemToSend = await Item.findOne({_id: updated_item._id}).populate('owner', 'address username profilepic');
  const transact = await Transaction.create({buyer: usr._id, price: "0.00", item_id: updated_item._id, txId: txHash});
  const transactToSend = await Transaction.findOne({_id: transact._id}).populate('seller', 'address').populate('buyer', 'address');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, item: itemToSend, transaction: transactToSend, user: usr});
});

router.put('/added_to_marketplace', cors.corsWithOptions, async (req, res, next) => {
  const address = req.body.address;
  const token_id = req.body.item_id;
  const status = req.body.status;
  const price = req.body.price;
  const marketplace_id = req.body.marketplace_id;
  const txHash = req.body.txHash;
  const enddate = req.body.enddate;
  const usr = await User.findOne({address: address});
  var auct, auctionn;
  if (status === "2"){
      console.log(enddate, txHash);
      auct = await Auction.create({item_id: token_id, status: true, price: price, enddate: enddate, txId: txHash});
      auctionn = await Auction.findById(auct._id).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});
  }
  const updated_item = await Item.findOneAndUpdate({owner: usr._id, _id: token_id}, {$set: {status: status, price: price, marketplace_id: marketplace_id}}, {new: true});
  const itemToSend = await Item.findOne({_id: updated_item._id}).populate('owner', 'address username profilepic');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  if (status === "2"){
      res.json({success: true, item: itemToSend, auction: auctionn, user: usr});
  }
  else{
      res.json({success: true, item: itemToSend});
  }
})

router.put('/likeitem/:itemid', cors.corsWithOptions, async (req, res, next) => {
  let itm = await Item.findById(req.params.itemid);
  const usr = await User.findOne({address: req.body.address});
  if (itm.likedBy.indexOf(usr._id) === -1){
      itm.likedBy = itm.likedBy.concat([usr._id]);
  }
  else{
      itm.likedBy = itm.likedBy.filter(x => {
          console.log(x);
          console.log(usr._id);
          return !(usr._id.equals(x));
      });
      console.log(itm);
  }

  await itm.save()
  const itemToSend = await Item.findOne({_id: req.params.itemid}).populate('owner', 'address username profilepic');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({item: itemToSend, success: true});
});

router.put('/instant-sold', cors.corsWithOptions, async (req, res, next) => {
  const address = req.body.address;
  const item_id = req.body.item_id;
  const prevOwner = req.body.prevOwner;
  const usr = await User.findOne({address: address});
  console.log(prevOwner, item_id, usr);
  const updated_item = await Item.findOneAndUpdate({_id: item_id}, {$set: {status: "0", owner: usr._id}}, {new: true});
  const itemToSend = await Item.findOne({_id: updated_item._id}).populate('owner', 'address username profilepic');
  console.log("Transaction input:", {seller: prevOwner, buyer: usr._id, item_id: item_id, price: updated_item.price, mode: false});
  const transct = await Transaction.create({seller: prevOwner, buyer: usr._id, item_id: item_id, price: updated_item.price, mode: false});
  const transction = await Transaction.findOne({_id: transct._id}).populate('seller', 'address').populate('buyer', 'address');
  console.log(transct);
  console.log(updated_item)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, item: itemToSend, transaction: transction, user: usr});
});

router.put('/auction-end', cors.corsWithOptions, async (req, res, next) => {
  const item_id = req.body.item_id;
  const itemm = await Item.findOne({_id: item_id});
  const usr = await User.findOne({address: req.body.address});
  // edit auction
  const upd_auction = await Auction.findOneAndUpdate({item_id: item_id, status: true}, {$set: {status: false}});
  const updated_auction = await Auction.findOne({_id: upd_auction._id}).populate('item_id', 'nft_id').populate({path: 'highestBid', populate: { path: 'bidder' }});

  // edit bid withdrawn true
  const updated_bid = await Bid.findOneAndUpdate({_id: upd_auction.highestBid._id}, {$set: {withdrawn: true}});
  const bidd = await Bid.findOne({_id: updated_bid._id}).populate('bidder', 'address username profilepic');

  // add new transaction
  const transac = await Transaction.create({item_id: item_id, buyer: updated_bid.bidder, price: updated_bid.price, seller: itemm.owner, mode: true, auction_id: upd_auction._id});
  const transact = await Transaction.findById(transac._id).populate('seller', 'address').populate('buyer', 'address');
  // edit owner and status of itme
  const updated_item = await Item.findOneAndUpdate({_id: item_id}, {$set: {owner: updated_bid.bidder, status: "0"}});
  const itemToSend = await Item.findOne({_id: updated_item._id}).populate('owner', 'address username profilepic');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, updated_item: itemToSend, transaction: transact, updated_bid: bidd, updated_auction: updated_auction, user: usr});
})


module.exports = router;