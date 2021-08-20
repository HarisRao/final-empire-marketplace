var express = require('express');
const User = require('../models/user');
var router = express.Router();
var cors = require('./cors');
var crypto = require("crypto");
const multer = require('multer');
var fs = require('fs');
var authenticate = require('../authenticate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, 'public/profilepics/');
  },
  filename: (req, file, cb) => {
      console.log(file)
      const code = crypto.randomBytes(4).toString('hex');
      cb(null, `img_${code}.${file.originalname.split('.')[1]}`);
  }
});

const imageFileFilter = (req, file, cb) => {
  console.log(file)
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
      return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

router.use(express.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* GET users listing. */
router.get('/:address', cors.corsWithOptions, async (req, res, next) => {
  const address = req.params.address;
  const userExist = await User.findOne({address: address});
  if (userExist){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: userExist});
  }
  else{
    let nonce = Math.floor(Math.random() * 1000000);
    await User.create({address: req.params.address, nonce: nonce});
    let created_user = await User.findOne({address: address});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: created_user});
  }
});
router.put('/profpic/editprofilepic', cors.corsWithOptions, upload.single('imageFile'), authenticate.signatureValid, async (req, res, next) => {

  let newImg = req.file.path.split(`public`)[1];
  const username = req.body.username;
  const email = req.body.email;
  const bio = req.body.bio;

  const u = await User.findOne({address: req.body.address});
  if (u.profilepic){
    fs.unlink(`public/${u.profilepic}`, (err) => {
      if (err){
        console.log("ajsd", err);
      }
    })
  }
  console.log({profilepic: newImg, email: email, username: username, bio: bio});
  const user = await User.findOneAndUpdate({address: req.body.address}, {$set: {profilepic: newImg, email: email, username: username, bio: bio}}, {new: true});

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'Verification Successful & Profile Picture Updated', user});
})

router.put('/:address', cors.corsWithOptions, authenticate.signatureValid, async (req, res, next) => {
  const address = req.params.address;
  const username = req.body.username;
  const email = req.body.email;
  const bio = req.body.bio;
  const userExist = await User.findOne({address: address});
  if (userExist){
    const updated_user = await User.findOneAndUpdate({address: address}, {$set: {username: username, email: email, bio: bio}}, {new: true});
    console.log(updated_user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: updated_user});
  }
  else{
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, status: 'Address not registered!'});
  }
})


module.exports = router;
