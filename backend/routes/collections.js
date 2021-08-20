var express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
var router = express.Router();
var cors = require('./cors')
var multer = require('multer');
var crypto = require('crypto');
var Collection = require('../models/collection');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, 'public/collections');
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
    const collections = await Collection.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, collections: collections});
})

router.post('/only-logo', cors.corsWithOptions, upload.single('logoImg'), async (req, res, next) => {
  const collection_address = req.body.collection_address;
  const address = req.body.address;
  const name = req.body.name;
  const symbol = req.body.symbol;
  const royalty_percent = req.body.royalty_percent;
  const usr = await User.findOne({address: address});
  var logoImg = req.file.path.split(`public`)[1];
  const collectionExists = await Collection.findOne({address: collection_address});
  if (collectionExists){
    fs.unlink(`public/${logoImg}`, (err) => {
      if (err){
        console.log("ajsd", err);
      }
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, collection: collectionExists, user: ''});
  }
  else{
    console.log({name: name, address: collection_address, symbol: symbol, royalty_percent: royalty_percent, logo: logoImg});
    const collectionCreated = await Collection.create({name: name, owner: usr._id, address: collection_address, symbol: symbol, royalty_percent: royalty_percent, logo: logoImg});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, collection: collectionCreated, user: ''});
  }
});

router.post('/featured-img', cors.corsWithOptions, upload.single('featuredImg'), async (req, res, next) => {
  const collection_address = req.body.collection_address;
  var featuredImg = req.file.path.split(`public`)[1];
  const collectionExists = await Collection.findOne({address: collection_address});
  if (collectionExists){
    if (collectionExists.featured_img){
      fs.unlink(`public/${collectionExists.featured_img}`, (err) => {
        if (err){
          console.log("ajsd", err);
        }
      })
    }
    let new_c = await Collection.findOneAndUpdate({address: collection_address}, {$set: {featured_img: featuredImg}}, {new: true});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, collection: new_c});
  }
  else{
    fs.unlink(`public/${featuredImg}`, (err) => {
      if (err){
        console.log("ajsd", err);
      }
    })
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Collection do not exist!'});
  }
});

router.post('/banner-img', cors.corsWithOptions, upload.single('bannerImg'), async (req, res, next) => {
  const collection_address = req.body.collection_address;
  var bannerImg = req.file.path.split(`public`)[1];
  const collectionExists = await Collection.findOne({address: collection_address});
  if (collectionExists){
    if (collectionExists.banner_img){
      fs.unlink(`public/${collectionExists.banner_img}`, (err) => {
        if (err){
          console.log("ajsd", err);
        }
      })
    }
    let new_c = await Collection.findOneAndUpdate({address: collection_address}, {$set: {banner_img: bannerImg}}, {new: true});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, collection: new_c});
  }
  else{
    fs.unlink(`public/${bannerImg}`, (err) => {
      if (err){
        console.log("ajsd", err);
      }
    })
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Collection do not exist!'});
  }
});

module.exports = router;