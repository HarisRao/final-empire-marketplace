const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Bid = new Schema({
	  item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    auction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: String,
        default: "0"
    },
    withdrawn: {
        type: Boolean,
        default: false
    },
    txId: {
      type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bid', Bid);