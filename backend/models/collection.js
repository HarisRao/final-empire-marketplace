const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CollectionSchema = new Schema({
	address: {
		type: String,
    default: '',
  },
  logo: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  symbol: {
    type: String
  },
  royalty_percent: {
    type: String
  },
  featured_img: {
    type: String
  },
  banner_img: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', CollectionSchema);